import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IChatModel} from "../models/chat/chat.model";
import {ICreatChatModel} from "../models/chat/create-chat.model";
import {HubConnection, HubConnectionBuilder, IHttpConnectionOptions} from "@microsoft/signalr";
import {filter, map, Subject, Subscription} from "rxjs";
import {EventData} from "../shared/event.class";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatConnection?: HubConnection;

  constructor(
    private http: HttpClient,
    private authService: AuthService
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

  edit(model: ICreatChatModel) {
    return this.http.put<any>(`${environment.apiUrl}/chats`, model);
  }

  inviteToChat(chatId:number, userId: number) {
    return this.http.post<any>(`${environment.apiUrl}/chats/${chatId}/add/${userId}`, []);
  }

  exitFromChat(chatId:number) {
    return this.http.delete<any>(`${environment.apiUrl}/chats/leave/${chatId}`);
  }

  private subject$ = new Subject<EventData>();

  on(eventName: string, action: any): Subscription {
    return this.subject$.pipe(
      filter((e: EventData) => e.name === eventName),
      map((e: EventData) => e["value"])).subscribe(action);
  }

  createChatConnection() {
    const options: IHttpConnectionOptions = {
        accessTokenFactory:  () => {
          return this.authService.getAccessToken();
          }
    };

    this.chatConnection = new HubConnectionBuilder()
      .withUrl(`${environment.baseUrl}/chat`, options)
      .withAutomaticReconnect()
      .build();

    this.chatConnection.start().catch(error=>{
      console.log(error)
    })

    this.chatConnection.on("AddedToChat", (chatId)=>{
      console.log("AddedToChat")
      this.subject$.next(new EventData("AddedToChat", chatId));
    });

    this.chatConnection.on("ReceiveMessage", (chatId, messageId)=>{
      this.subject$.next(new EventData("ReceiveMessage", {chatId, messageId}));
    });

    this.chatConnection.on("UpdateChat", (chatId)=>{
      this.subject$.next(new EventData("UpdateChat", chatId));
    });
  }

  sendMessage(chatId:number, messageId: number) {
    // @ts-ignore
    return this.chatConnection.send("SendMessage", chatId, messageId);
  }

  inviteToChatSignal(chatId:number, userId: number) {
    // @ts-ignore
    return this.chatConnection.send("InviteToChat", chatId, userId);
  }

  updateChat(chatId:number) {
    // @ts-ignore
    return this.chatConnection.send("UpdateChat", chatId);
  }

  exitFromChatSignal(chatId:number) {
    // @ts-ignore
    return this.chatConnection.send("LeaveFromChat", chatId);
  }

  stopChatConnection() {
    this.chatConnection?.stop().catch(error=>{
      console.log(error)
    })
  }
}
