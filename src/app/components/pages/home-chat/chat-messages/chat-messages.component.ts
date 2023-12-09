import {
  Component,
  EventEmitter,
  Input,
  OnChanges, OnInit,
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
import {ChatService} from "../../../../services/chat.service";
import {environment} from "../../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html'
})
export class ChatMessagesComponent implements OnChanges, OnInit {
  options = { autoHide: true, scrollbarMinSize: 5 };
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
    private modalService: ModalService,
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.chatService.on("ReceiveMessage", (model: any)=>{
      this.messageService.message(model.messageId).subscribe(resp=>{
        if(this.messages.filter(x => x.id == model.messageId).length == 0) {
          if(this.chat && this.chat.id == model.chatId) {
            let message = resp;
            if(message.user.image) {
              message.user.image = environment.imageUrl + message.user.image;
            }
            this.messages.push(message);
            this.scrollBottom();
          }
          this.onMessageSend.emit({id: model.chatId, message: resp});
        }
      })
    })

    this.chatService.on("UpdateChat", (model: any)=>{
      const sel: string | null = this.route.snapshot.queryParamMap.get('sel');

      if(sel == model) {
        this.messageService.messages(model).subscribe(resp=>{
          this.messages = resp;
          for (let i = 0; i < this.messages.length; i++) {
            if(this.messages[i].user.image) {
              this.messages[i].user.image = environment.imageUrl + this.messages[i].user.image;
            }
          }
          this.scrollBottom();
        })
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['chat'] && this.chat?.id) {
      this.messages = [];
      this.messageService.messages(this.chat.id).subscribe(resp => {
        this.messages = resp;
        for (let i = 0; i < this.messages.length; i++) {
          if(this.messages[i].user.image) {
            this.messages[i].user.image = environment.imageUrl + this.messages[i].user.image;
          }
        }
        this.scrollBottom();
      })
    }
  }

  private scrollBottom() {
    setTimeout(() => {
      this.scrollable.SimpleBar.getScrollElement().scrollTop = this.scrollable.SimpleBar.getScrollElement().scrollHeight;
    }, 300);
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
      let message = resp;
      if(message.user.image) {
        message.user.image = environment.imageUrl + message.user.image;
      }
      this.messages.push(message);
      this.scrollBottom();
      this.onMessageSend.emit({id: this.chat.id, message: message});
    })
  }

  showUsersModal() {
    this.modalService.show(UsersInChatComponent);
  }
}
