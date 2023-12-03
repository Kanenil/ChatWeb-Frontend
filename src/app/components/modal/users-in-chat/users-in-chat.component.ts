import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../../services/modal.service";
import {ActivatedRoute} from "@angular/router";
import {ChatService} from "../../../services/chat.service";
import {IChatModel} from "../../../models/chat/chat.model";
import {UserService} from "../../../services/user.service";
import {IExtendedUserModel} from "../../../models/user/extended-user.model";
import {IUserModel} from "../../../models/user/user.model";
import {environment} from "../../../../environments/environment";
import {MembersInGroupComponent} from "../members-in-group/members-in-group.component";
import {EditChatComponent} from "../edit-chat/edit-chat.component";
import {InviteToGroupComponent} from "../invite-to-group/invite-to-group.component";

@Component({
  selector: 'app-users-in-chat',
  templateUrl: './users-in-chat.component.html'
})
export class UsersInChatComponent implements OnInit {
  // @ts-ignore
  chat:IChatModel;
  users: IExtendedUserModel[] = [];
  selectedUserId: number | string = 0;

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
        if(this.chat.image) {
          this.chat.image = environment.imageUrl + this.chat.image;
        }
        this.userService.users().subscribe(resp=>{
          this.users = resp.filter(item1 => !this.chat.users?.some(item2 => item1.userName === item2.userName))
        });
      });
    }
  }

  inviteUser() {
    if(this.selectedUserId) {
      let num = Number(this.selectedUserId);
      this.chatService.inviteToChat(this.chat.id, num).subscribe(resp=>{
        this.chatService.inviteToChatSignal(this.chat.id, num).then(resp => {
          console.log("InviteToChat: Sent signal to user " + this.selectedUserId);
        }).catch(error => console.error('Error sending inviteToChatSignal:', error));

        const index = this.users.findIndex(user => user.id == num);

        let user  = this.users
          .filter(x => x.id == this.selectedUserId)
          .map(x => <IUserModel>x)
          .shift();

        if(user) {
          this.chat.users?.push(user);
        }

        this.users.splice(index, 1);
      })
    }
  }

  showUsersInGroup() {
    this.modalService.show(MembersInGroupComponent);
  }

  showEditChat() {
    this.modalService.show(EditChatComponent);
  }

  showInviteToGroup() {
    this.modalService.show(InviteToGroupComponent);
  }
}
