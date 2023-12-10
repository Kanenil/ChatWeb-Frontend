import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../../services/modal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ChatService} from "../../../services/chat.service";
import {IChatModel} from "../../../models/chat/chat.model";
import {UserService} from "../../../services/user.service";
import {IExtendedUserModel} from "../../../models/user/extended-user.model";
import {environment} from "../../../../environments/environment";
import {MembersInGroupComponent} from "../members-in-group/members-in-group.component";
import {EditChatComponent} from "../edit-chat/edit-chat.component";
import {InviteToGroupComponent} from "../invite-to-group/invite-to-group.component";
import {EventBusService} from "../../../shared/event-bus.service";
import {EventData} from "../../../shared/event.class";

@Component({
  selector: 'app-users-in-chat',
  templateUrl: './users-in-chat.component.html'
})
export class UsersInChatComponent implements OnInit {
  // @ts-ignore
  chat:IChatModel;
  users: IExtendedUserModel[] = [];
  leaveConfirmation: boolean = false;

  constructor(
    public modalService: ModalService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService,
    private router: Router,
    private eventBusService: EventBusService
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

  showUsersInGroup() {
    this.modalService.show(MembersInGroupComponent);
  }

  showEditChat() {
    this.modalService.show(EditChatComponent);
  }

  showInviteToGroup() {
    this.modalService.show(InviteToGroupComponent);
  }

  leaveFromChat() {
    this.chatService.exitFromChat(this.chat.id).subscribe(resp => {
      this.chatService.exitFromChatSignal(this.chat.id).then()
      this.router.navigate(['.'], { relativeTo: this.route, queryParams: { sel: null },
        queryParamsHandling: 'merge'})
      this.modalService.close();
      this.eventBusService.emit(new EventData("ExitChat", this.chat.id));
    })
  }
}
