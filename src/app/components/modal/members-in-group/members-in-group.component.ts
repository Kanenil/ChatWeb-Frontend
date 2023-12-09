import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../../services/modal.service";
import {UsersInChatComponent} from "../users-in-chat/users-in-chat.component";
import {ActivatedRoute} from "@angular/router";
import {ChatService} from "../../../services/chat.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-members-in-group',
  templateUrl: './members-in-group.component.html'
})
export class MembersInGroupComponent implements OnInit {
  // @ts-ignore
  chat:IChatModel;
  filter: string = '';

  constructor(
    public modalService: ModalService,
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    const sel: string | null = this.route.snapshot.queryParamMap.get('sel');

    if(sel) {
      this.chatService.chat(sel).subscribe(resp=>{
        this.chat = resp;
        for (let i = 0; i < this.chat.users?.length; i++) {
          if(this.chat.users[i].image) {
            this.chat.users[i].image = environment.imageUrl + this.chat.users[i].image;
          }
        }
      });
    }
  }

  ShowGroupInfo() {
    this.modalService.show(UsersInChatComponent);
  }
}
