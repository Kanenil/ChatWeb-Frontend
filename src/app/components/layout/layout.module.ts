import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import { ChatComponent } from './chat/chat.component';
import { DefaultComponent } from './default/default.component';
import { FooterComponent } from './default/footer/footer.component';
import { HeaderComponent } from './default/header/header.component';
import { ThemeSwitcherComponent } from './default/header/theme-switcher/theme-switcher.component';

@NgModule({
  declarations: [
    ChatComponent,
    DefaultComponent,
    FooterComponent,
    HeaderComponent,
    ThemeSwitcherComponent
  ],
  imports: [
    CommonModule,
    RouterLinkActive,
    RouterLink,
    RouterOutlet
  ],
  exports: [
    ChatComponent,
    DefaultComponent
  ]
})
export class LayoutModule { }
