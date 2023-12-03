import {Component} from '@angular/core';
import {ModalService} from "../../../services/modal.service";
import {ThemeService} from "../../../services/theme.service";

@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat.component.html'
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
