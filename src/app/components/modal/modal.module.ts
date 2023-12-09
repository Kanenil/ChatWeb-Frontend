import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { CreateChatComponent } from './create-chat/create-chat.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import { UsersInChatComponent } from './users-in-chat/users-in-chat.component';
import { MembersInGroupComponent } from './members-in-group/members-in-group.component';
import {SimplebarAngularModule} from "simplebar-angular";
import {PipesModule} from "../../pipes/pipes.module";
import { EditChatComponent } from './edit-chat/edit-chat.component';
import { InviteToGroupComponent } from './invite-to-group/invite-to-group.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    ModalComponent,
    CreateChatComponent,
    UsersInChatComponent,
    MembersInGroupComponent,
    EditChatComponent,
    InviteToGroupComponent,
    ProfileComponent
  ],
  exports: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    SimplebarAngularModule,
    PipesModule
  ]
})
export class ModalModule { }
