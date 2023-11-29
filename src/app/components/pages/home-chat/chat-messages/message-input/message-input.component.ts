import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MessageService} from "../../../../../services/message.service";

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
    private messageService: MessageService
  ) {}

  onEnterKey(event: any) {
    this.onSubmit();
  }

  onSubmit() {
    this.messageService.send({chatId: this.chatId, content: this.input}).subscribe(resp=>{
      this.onMessageSend.emit(resp.id);
      this.input = '';
    })
  }
}
