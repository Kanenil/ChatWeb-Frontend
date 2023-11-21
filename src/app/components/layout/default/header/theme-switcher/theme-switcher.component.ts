import { Component } from '@angular/core';
import {ThemeService} from "../../../../../services/theme.service";

@Component({
  selector: 'header-theme-switcher',
  templateUrl: './theme-switcher.component.html'
})
export class ThemeSwitcherComponent {
  constructor(
    public themeService: ThemeService
  ) { }
}
