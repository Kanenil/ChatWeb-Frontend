import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IMessageModel} from "../models/message/message.model";
import {ICreateMessageModel} from "../models/message/create-message.model";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http: HttpClient
  ) { }

  messages(id: string | number) {
    return this.http.get<IMessageModel[]>(`${environment.apiUrl}/messages/chat/${id}`);
  }

  message(id: string | number) {
    return this.http.get<IMessageModel>(`${environment.apiUrl}/messages/message/${id}`);
  }

  send(model: ICreateMessageModel) {
    return this.http.post<any>(`${environment.apiUrl}/messages/`, model);
  }
}
