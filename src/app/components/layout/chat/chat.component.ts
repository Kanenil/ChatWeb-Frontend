import {Component} from '@angular/core';
import {ModalService} from "../../../services/modal.service";
import {ThemeService} from "../../../services/theme.service";

@Component({
  selector: 'app-chat-layout',
  template: `
    <div class="flex bg-white dark:bg-zinc-800">
      <app-chat-sidebar></app-chat-sidebar>
      <div class="h-screen w-full">
        <router-outlet></router-outlet>
      </div>

      <app-modal *ngIf="modalService.isVisible$ | async">
        <ng-container *ngComponentOutlet="modalService.selectedComponent$ | async"></ng-container>
      </app-modal>
    </div>
  `
})
export class ChatComponent {
 constructor(public modalService: ModalService, public themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.initTheme()

    this.themeService.isDarkTheme$.subscribe(theme => {
      theme.valueOf()?document.body.classList.add('dark'):document.body.classList.remove('dark');
    })
  }
}
