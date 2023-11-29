import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../../services/modal.service";
import {ActivatedRoute} from "@angular/router";
import {ChatService} from "../../../services/chat.service";
import {IChatModel} from "../../../models/chat/chat.model";
import {UserService} from "../../../services/user.service";
import {IExtendedUserModel} from "../../../models/user/extended-user.model";

@Component({
  selector: 'app-users-in-chat',
  templateUrl: './users-in-chat.component.html'
})
export class UsersInChatComponent implements OnInit {
  // @ts-ignore
  chat:IChatModel;
  users: IExtendedUserModel[] = [];
  selectedUserId: number|null = null;

  constructor(
    public modalService: ModalService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService
  ) { }

  ngOnInit(): void {


    const sel: string | null = this.route.snapshot.queryParamMap.get('sel');

    if(sel) {
      this.chatService.chat(sel).subscribe(resp=>{
        this.chat = resp;
        this.userService.users().subscribe(resp=>{
          this.users = resp.filter(item1 => !this.chat.users?.some(item2 => item1.userName === item2.userName))
        });
      });
    }
  }

  inviteUser() {
    if(this.selectedUserId) {
      this.chatService.inviteToChat(this.chat.id, this.selectedUserId).subscribe(resp=>{
        const index = this.users.findIndex(user => user.id === this.selectedUserId);
        this.chat.users?.push(this.users[index]);
        this.users.splice(index, 1);
      })
    }
  }

}
