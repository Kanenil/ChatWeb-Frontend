import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {RouterLink} from "@angular/router";
import { LoginComponent } from './auth/login/login.component';
import {GoogleSigninModule} from "../google-signin/google-signin.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './auth/register/register.component';
import { GoogleFinishComponent } from './auth/google-finish/google-finish.component';
import { HomeChatComponent } from './home-chat/home-chat.component';
import {SimplebarAngularModule} from "simplebar-angular";
import {PipesModule} from "../../pipes/pipes.module";
import {ModalModule} from "../modal/modal.module";
import { ChatsBarComponent } from './home-chat/chats-bar/chats-bar.component';
import {ChatItemComponent} from "../chat-item/chat-item.component";
import {MessageBubbleComponent} from "../message-bubble/message-bubble.component";
import { ChatMessagesComponent } from './home-chat/chat-messages/chat-messages.component';
import {DirectivesModule} from "../../directives/directives.module";
import { MessageInputComponent } from './home-chat/chat-messages/message-input/message-input.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    GoogleFinishComponent,
    HomeChatComponent,
    ChatsBarComponent,
    ChatItemComponent,
    MessageBubbleComponent,
    ChatMessagesComponent,
    MessageInputComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        GoogleSigninModule,
        ReactiveFormsModule,
        SimplebarAngularModule,
        PipesModule,
        ModalModule,
        DirectivesModule,
        FormsModule
    ]
})
export class PagesModule { }
