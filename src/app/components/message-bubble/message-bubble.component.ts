import {Component, Input} from '@angular/core';
import {IUserModel} from "../../models/user/user.model";
import {IMessageModel} from "../../models/message/message.model";

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html'
})
export class MessageBubbleComponent {
  // @ts-ignore
  @Input() loggedUser: IUserModel;
  // @ts-ignore
  @Input() message: IMessageModel;
  // @ts-ignore
  @Input() nextMessage: IMessageModel | null;

  isNextTheSameUser() {
    return this.nextMessage?.user?.userName == this.message.user?.userName;
  }
}
