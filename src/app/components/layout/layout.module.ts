import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import { ChatComponent } from './chat/chat.component';
import { DefaultComponent } from './default/default.component';
import { FooterComponent } from './default/footer/footer.component';
import { HeaderComponent } from './default/header/header.component';
import { ThemeSwitcherComponent } from './default/header/theme-switcher/theme-switcher.component';
import { SidebarComponent } from './chat/sidebar/sidebar.component';
import {DirectivesModule} from "../../directives/directives.module";
import {ModalModule} from "../modal/modal.module";
import { ChatThemeSwitcherComponent } from './chat/sidebar/chat-theme-switcher/chat-theme-switcher.component';
import { SidebarNavComponent } from './chat/sidebar/sidebar-nav/sidebar-nav.component';

@NgModule({
  declarations: [
    ChatComponent,
    DefaultComponent,
    FooterComponent,
    HeaderComponent,
    ThemeSwitcherComponent,
    SidebarComponent,
    ChatThemeSwitcherComponent,
    SidebarNavComponent
  ],
    imports: [
        CommonModule,
        RouterLinkActive,
        RouterLink,
        RouterOutlet,
        DirectivesModule,
        ModalModule
    ],
  exports: [
    ChatComponent,
    DefaultComponent
  ]
})
export class LayoutModule { }
