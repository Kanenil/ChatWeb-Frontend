import {Component, OnInit} from '@angular/core';
import {IExtendedUserModel} from "../../../models/user/extended-user.model";
import {FormBuilder} from "@angular/forms";
import {ChatService} from "../../../services/chat.service";
import {ModalService} from "../../../services/modal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {environment} from "../../../../environments/environment";
import {IChatModel} from "../../../models/chat/chat.model";
import {UsersInChatComponent} from "../users-in-chat/users-in-chat.component";

@Component({
  selector: 'app-invite-to-group',
  templateUrl: './invite-to-group.component.html'
})
export class InviteToGroupComponent implements OnInit {
  // @ts-ignore
  chat: IChatModel;
  users: IExtendedUserModel[] = [];
  selectedUsers: IExtendedUserModel[] = [];
  filter: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private chatService: ChatService,
    public modalService: ModalService,
    private userService: UserService,
    private route: ActivatedRoute
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

  onCheckboxChange(user: IExtendedUserModel, check: boolean) {
    if(this.selectedUsers.indexOf(user) != -1) {
      this.selectedUsers.splice(this.selectedUsers.indexOf(user), 1)
    }

    check ? this.selectedUsers.push(user) : this.selectedUsers.splice(this.selectedUsers.indexOf(user), 1);
  }

  onSubmit() {
    const sel: string | null = this.route.snapshot.queryParamMap.get('sel');

    if(sel) {
      if(this.selectedUsers.length > 0) {
        for (const user of this.selectedUsers) {
          this.chatService.inviteToChat(Number(sel), user.id).subscribe();
          this.chatService.inviteToChatSignal(Number(sel), user.id).then();
        }
        this.modalService.close();
      }
    }
  }

  goBack() {
    this.modalService.show(UsersInChatComponent);
  }
}
