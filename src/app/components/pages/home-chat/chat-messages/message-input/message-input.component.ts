import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MessageService} from "../../../../../services/message.service";
import {ChatService} from "../../../../../services/chat.service";

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html'
})
export class MessageInputComponent {
  input: string = '';
  // @ts-ignore
  @Input() chatId: number;
  @Output() onMessageSend = new EventEmitter<number>();

  constructor(
    private messageService: MessageService,
    private chatService: ChatService
  ) {}

  onEnterKey(event: any) {
    this.onSubmit();
  }

  onSubmit() {
    if(this.input.trim().length > 0) {
      this.messageService.send({chatId: this.chatId, content: this.input}).subscribe(resp=>{
        this.chatService.sendMessage(this.chatId, resp.id).then(resp => {
          console.log("Sent to real time");
        })
        this.onMessageSend.emit(resp.id);
        this.input = '';
      })
    }
  }
}
