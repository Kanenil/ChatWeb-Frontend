import { Component } from '@angular/core';
import {ThemeService} from "../../../../../services/theme.service";

@Component({
  selector: 'app-chat-theme-switcher',
  templateUrl: './chat-theme-switcher.component.html'
})
export class ChatThemeSwitcherComponent {
  constructor(
    public themeService: ThemeService
  ) { }
}
