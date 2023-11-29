import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { CreateChatComponent } from './create-chat/create-chat.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import { UsersInChatComponent } from './users-in-chat/users-in-chat.component';



@NgModule({
  declarations: [
    ModalComponent,
    CreateChatComponent,
    UsersInChatComponent
  ],
  exports: [
    ModalComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        FormsModule
    ]
})
export class ModalModule { }
