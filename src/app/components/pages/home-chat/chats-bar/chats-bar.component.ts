import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IChatModel} from "../../../../models/chat/chat.model";
import {ChatService} from "../../../../services/chat.service";
import {ModalService} from "../../../../services/modal.service";
import {CreateChatComponent} from "../../../modal/create-chat/create-chat.component";
import {Observable, Subscription} from "rxjs";
import {ISentMessageModel} from "../../../../models/message/sent-message.model";
import {environment} from "../../../../../environments/environment";
import {EventBusService} from "../../../../shared/event-bus.service";

@Component({
  selector: 'app-chats-bar',
  templateUrl: './chats-bar.component.html'
})
export class ChatsBarComponent implements OnInit, OnDestroy {
  chats : IChatModel[] = [];
  options = { autoHide: true, scrollbarMinSize: 100 };
  // @ts-ignore
  private eventsSubscription: Subscription;

  @Output() chatChanged = new EventEmitter<number>();
  // @ts-ignore
  @Input() messageSent: Observable<ISentMessageModel>;

  constructor(
    private chatService: ChatService,
    private modalService: ModalService,
    private eventBusService: EventBusService
  ) {}

  ngOnInit(): void {
    this.eventsSubscription = this.messageSent.subscribe((x) => {
      for (let i = 0; i < this.chats.length; i++) {
        if(this.chats[i].id == x.id) {
          this.chats[i].lastMessage = x.message;
          break;
        }
      }
      this.sortByLastMessage();
    });

    this.eventBusService.on("ChatCreate", (id:number)=>{
      this.chatService.chat(id).subscribe(resp => {
        this.selectChat(resp.id);
        if(resp.image) {
          resp.image = environment.imageUrl + resp.image;
        }
        this.chats.push(resp);
        this.sortByLastMessage();
      })
    })

    this.chatService.on("AddedToChat", (model:any)=>{
      this.chatService.chat(model).subscribe(resp=>{
        if(resp.image) {
          resp.image = environment.imageUrl + resp.image
        }
        this.chats.push(resp);
        this.sortByLastMessage();
      })
    })

    this.chatService.on("UpdateChat", (model:any)=>{
      this.chatService.chat(model).subscribe(resp=>{
        if(resp.image) {
          resp.image = environment.imageUrl + resp.image
        }
        let index = this.chats.findIndex(val => val.id == resp.id);
        this.chats.splice(index, 1);
        this.chats.push(resp);
        this.sortByLastMessage();
      })
    })

    this.chatService.chats().subscribe(resp=>{
      this.chats = resp;
      for (let i = 0; i < this.chats.length; i++) {
        if (this.chats[i].image) {
          this.chats[i].image = environment.imageUrl + this.chats[i].image;
        }
      }
      this.sortByLastMessage();
    });
  }

  private sortByLastMessage() {
    this.chats.sort((a,b)=> !a.lastMessage? 1: a.lastMessage?.dateCreated < b.lastMessage?.dateCreated?1:-1);
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  selectChat(value: number) {
    this.chatChanged.emit(value);
  }

  createOwnChatShow() {
    this.modalService.show(CreateChatComponent);
  }
}
