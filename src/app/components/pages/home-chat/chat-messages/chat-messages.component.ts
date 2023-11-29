import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges, ViewChild
} from '@angular/core';
import {IMessageModel} from "../../../../models/message/message.model";
import {IUserModel} from "../../../../models/user/user.model";
import {IChatModel} from "../../../../models/chat/chat.model";
import {MessageService} from "../../../../services/message.service";
import {ModalService} from "../../../../services/modal.service";
import {CreateChatComponent} from "../../../modal/create-chat/create-chat.component";
import {ISentMessageModel} from "../../../../models/message/sent-message.model";
import {UsersInChatComponent} from "../../../modal/users-in-chat/users-in-chat.component";
import {SimplebarAngularComponent} from "simplebar-angular";

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html'
})
export class ChatMessagesComponent implements OnChanges {
  options = { autoHide: true, scrollbarMinSize: 10 };
  messages : IMessageModel[] = [];
  isOpen = false;

  // @ts-ignore
  @Input() chat: IChatModel;
  // @ts-ignore
  @Input() loggedUser: IUserModel;
  @Output() onMessageSend = new EventEmitter<ISentMessageModel>();

  // @ts-ignore
  @ViewChild("scrollable") scrollable : SimplebarAngularComponent;

  constructor(
    private messageService:MessageService,
    private modalService: ModalService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['chat'] && this.chat?.id) {
      this.messages = [];
      this.messageService.messages(this.chat.id).subscribe(resp => {
        this.messages = resp;
        this.scrollBottom();
      })
    }
  }

  private scrollBottom() {
    setTimeout(() => {
      this.scrollable.SimpleBar.getScrollElement().scrollTop = this.scrollable.SimpleBar.getScrollElement().scrollHeight;
    }, 0);
  }

  toggleOpen() {
    if(this.isOpen) {
      // @ts-ignore
      document.querySelector('.dialog').classList.add("hidden");
    } else {
      // @ts-ignore
      document.querySelector('.dialog').classList.remove("hidden");
    }

    this.isOpen = !this.isOpen;
  }

  handleClick(el: Element) {
    if(!el.closest('.dialog') && !el.closest('#toggle') && this.isOpen) {
      this.toggleOpen();
    }
  }

  createOwnChatShow() {
    this.modalService.show(CreateChatComponent);
  }

  onMessageSendHandler(id: number) {
    this.messageService.message(id).subscribe(resp=>{
      this.messages.push(resp);
      this.scrollBottom();
      this.onMessageSend.emit({id: this.chat.id, message: resp});
    })
  }

  showUsersModal() {
    this.modalService.show(UsersInChatComponent);
  }
}
