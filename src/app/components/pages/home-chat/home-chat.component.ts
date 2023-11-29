import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {IUserModel} from "../../../models/user/user.model";
import {IChatModel} from "../../../models/chat/chat.model";
import {ChatService} from "../../../services/chat.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
import {ISentMessageModel} from "../../../models/message/sent-message.model";

@Component({
  selector: 'app-home-chat',
  template: `
    <div class="flex">
      <app-chats-bar [messageSent]="messageSent" (chatChanged)="chatSelected($event)"></app-chats-bar>
      <app-chat-messages [loggedUser]="loggedUser" [chat]="chat" (onMessageSend)="onMessageSendHandler($event)"></app-chat-messages>
    </div>
  `
})
export class HomeChatComponent implements OnInit {
  // @ts-ignore
  chat: IChatModel;
  // @ts-ignore
  loggedUser: IUserModel;
  messageSent: Subject<ISentMessageModel> = new Subject<ISentMessageModel>();

  constructor(
    private accountService: AccountService,
    private chatService: ChatService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.accountService.profile().subscribe(resp=>{
      this.loggedUser = resp;
    })

    const sel: string | null = this.route.snapshot.queryParamMap.get('sel');

    if(sel) {
      this.chatById(sel);
    }
  }

  chatSelected(chat: number) {
    this.chatById(chat);
  }

  private chatById(id: number | string) {
    this.chatService.chat(id).subscribe(resp=>{
      this.chat = resp;
      this.router.navigate(['.'], { relativeTo: this.route, queryParams: { sel: resp.id }})
    })
  }

  onMessageSendHandler(model:ISentMessageModel) {
    this.messageSent.next(model);
  }

}
