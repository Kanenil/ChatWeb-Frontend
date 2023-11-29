import {OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from "@angular/common";
import {interval, Subject, switchMap, takeUntil, timer} from "rxjs";

@Pipe({
  name: 'customTimeAgo',
  pure: false,
})
export class CustomTimeAgoPipe implements PipeTransform, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private datePipe: DatePipe) {
    timer(0, 60000) // Викликати один раз і потім кожні 60000 мс (1 хвилина)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => interval(1000)) // Викликати кожну секунду всередині хвилини
      )
      .subscribe(() =>{});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  transform(value: string | Date): string {
    const now = new Date();
    const inputDate = new Date(value);

    const diffInMinutes = Math.floor((now.getTime() - inputDate.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 1440) {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes < 2880) {
      return 'yesterday';
    } else {
      return <string>this.datePipe.transform(inputDate, 'medium');
    }
  }
}
