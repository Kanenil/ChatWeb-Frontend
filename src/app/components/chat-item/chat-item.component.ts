import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IChatModel} from "../../models/chat/chat.model";

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html'
})
export class ChatItemComponent {
  // @ts-ignore
  @Input() chat: IChatModel;
  @Output() selected = new EventEmitter<number>();

  selectChat() {
    this.selected.emit(this.chat.id);
  }
}
