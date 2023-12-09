import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilterPipe',
  pure: false
})
export class MyFilterPipePipe implements PipeTransform {

  transform(items: any[], filter: Object): any {
    if (!items || !filter) {
      return items;
    }

    // @ts-ignore
    return items.filter(item => item.userName.toLowerCase().indexOf(filter.userName.toLowerCase()) !== -1);
  }

}
