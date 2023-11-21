import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private THEME = "THEME";

  isDarkTheme$ = new BehaviorSubject<boolean>(false);

  initTheme() {
    this.isDarkTheme$.next(!!localStorage.getItem(this.THEME));
  }

  toggleTheme() {

    if(localStorage.getItem(this.THEME)) {
      localStorage.removeItem(this.THEME);
      this.isDarkTheme$.next(false);
    } else {
      localStorage.setItem(this.THEME, 'dark');
      this.isDarkTheme$.next(true);
    }

  }
}
