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
  selectedImage: string | ArrayBuffer | null = null;
  file: File | null = null;

  constructor(
    private messageService: MessageService,
    private chatService: ChatService
  ) {}

  fileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e =>  {
        if(this.isImage(this.file?.type)) {
          this.selectedImage = reader.result;
        }
      };

      this.file = file;
      this.selectedImage = null;

      reader.readAsDataURL(file);
    }
  }

  removeFile() {
    this.selectedImage = null;
    this.file = null;
  }

  private isImage(fileType?: string): boolean {
    return fileType?.startsWith('image/') || false;
  }

  onEnterKey(event: any) {
    this.onSubmit();
  }

  onSubmit() {
    if(this.input.trim().length > 0 || this.file) {
      let formData = new FormData()
      // @ts-ignore
      formData.append('file', this.file)
      // @ts-ignore
      formData.append('chatId', this.chatId)
      // @ts-ignore
      formData.append('content', this.input.trim())

      this.messageService.send(formData).subscribe(resp=>{
        this.chatService.sendMessage(this.chatId, resp.id).then(resp => {
          console.log("Sent to real time");
        })
        this.onMessageSend.emit(resp.id);
        this.input = '';
        this.file = null;
        this.selectedImage = null;
      })
    }

  }


}
