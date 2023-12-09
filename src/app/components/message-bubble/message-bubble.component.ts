import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {IUserModel} from "../../models/user/user.model";
import {IMessageModel} from "../../models/message/message.model";
import {FileService} from "../../services/file.service";

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html'
})
export class MessageBubbleComponent implements OnChanges {
  // @ts-ignore
  @Input() loggedUser: IUserModel;
  // @ts-ignore
  @Input() message: IMessageModel;
  // @ts-ignore
  @Input() nextMessage: IMessageModel | null;
  fileDetail: {size: number, isImage: boolean, path: string} | null = null;

  constructor(private fileService: FileService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['message'] && changes['message'].currentValue?.fileName.length > 0) {
      this.fileService.getFileDetails(this.message.fileName).subscribe(resp => {
        this.fileDetail = resp;
      })
    }
  }

  isNextTheSameUser() {
    return this.nextMessage?.user?.userName == this.message.user?.userName;
  }
}
