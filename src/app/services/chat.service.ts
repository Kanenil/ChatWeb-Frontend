import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IChatModel} from "../models/chat/chat.model";
import {ICreatChatModel} from "../models/chat/create-chat.model";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private http: HttpClient
  ) { }

  chats() {
    return this.http.get<IChatModel[]>(`${environment.apiUrl}/chats`);
  }

  chat(id: string | number) {
    return this.http.get<IChatModel>(`${environment.apiUrl}/chats/${id}`);
  }

  create(model: ICreatChatModel) {
    return this.http.post<any>(`${environment.apiUrl}/chats`, model);
  }

  inviteToChat(chatId:number, userId: number) {
    return this.http.post<any>(`${environment.apiUrl}/chats/${chatId}/add/${userId}`, []);
  }

}
