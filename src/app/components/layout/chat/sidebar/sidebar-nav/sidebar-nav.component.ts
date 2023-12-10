import { Component } from '@angular/core';
import {EventBusService} from "../../../../../shared/event-bus.service";
import {EventData} from "../../../../../shared/event.class";

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html'
})
export class SidebarNavComponent {
  isOpen: boolean = false;
  constructor(
    private eventBusService: EventBusService
  ) {
    this.eventBusService.on("Chats", (status:boolean)=>{
      this.isOpen = status;
    })
  }
  openChats() {
    this.eventBusService.emit(new EventData("Chats", !this.isOpen));
  }
}
