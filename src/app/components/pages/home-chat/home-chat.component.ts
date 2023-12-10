import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {IUserModel} from "../../../models/user/user.model";
import {IChatModel} from "../../../models/chat/chat.model";
import {ChatService} from "../../../services/chat.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
import {ISentMessageModel} from "../../../models/message/sent-message.model";
import {environment} from "../../../../environments/environment";
import {EventBusService} from "../../../shared/event-bus.service";

@Component({
  selector: 'app-home-chat',
  template: `
    <div class="flex overflow-hidden">
      <app-chats-bar [messageSent]="messageSent" (chatChanged)="chatSelected($event)"></app-chats-bar>
      <div class="flex-1">
        <app-chat-messages [loggedUser]="loggedUser" [chat]="chat" (onMessageSend)="onMessageSendHandler($event)"></app-chat-messages>
      </div>
    </div>

  `
})
export class HomeChatComponent implements OnInit, OnDestroy {
  // @ts-ignore
  chat: IChatModel;
  // @ts-ignore
  loggedUser: IUserModel;
  messageSent: Subject<ISentMessageModel> = new Subject<ISentMessageModel>();

  constructor(
    private accountService: AccountService,
    private chatService: ChatService,
    private router: Router,
    private route: ActivatedRoute,
    private eventBusService: EventBusService
  ) {}

  ngOnInit(): void {
    this.chatService.createChatConnection();

    this.accountService.profile().subscribe(resp=>{
      this.loggedUser = resp;
      if(this.loggedUser.image) {
        this.loggedUser.image = environment.imageUrl + this.loggedUser.image;
      }
    })

    this.chatService.on("UpdateChat", (model: any)=>{
      const sel: string | null = this.route.snapshot.queryParamMap.get('sel');

      if(sel && sel == model) {
        this.chatById(model);
      }
    })

    this.eventBusService.on("ChatCreate", (id:number)=>{
      setTimeout(()=>this.chatById(id), 100);
    })

    const sel: string | null = this.route.snapshot.queryParamMap.get('sel');

    if(sel) {
      this.chatById(sel);
    }
  }

  ngOnDestroy() {
    this.chatService.stopChatConnection();
  }

  chatSelected(chat: number) {
    if(chat == -1) {
      // @ts-ignore
      this.chat = null;
      return;
    }

    this.chatById(chat);
  }

  private chatById(id: number | string) {
    this.chatService.chat(id).subscribe(resp=>{
      this.chat = resp;
      if(this.chat.image) {
        this.chat.image = environment.imageUrl + this.chat.image;
      }
      this.router.navigate(['.'], { relativeTo: this.route, queryParams: { sel: resp.id }})
    })
  }

  onMessageSendHandler(model:ISentMessageModel) {
    this.messageSent.next(model);
  }

}
