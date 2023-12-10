import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ModalService} from "../../../services/modal.service";
import {ChatService} from "../../../services/chat.service";
import {EventBusService} from "../../../shared/event-bus.service";
import {IExtendedUserModel} from "../../../models/user/extended-user.model";
import {UserService} from "../../../services/user.service";
import {environment} from "../../../../environments/environment";
import {EventData} from "../../../shared/event.class";

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html'
})
export class CreateChatComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    image: new FormControl(''),
  });
  submitted = false;
  selectedImage: string | ArrayBuffer | null = null;
  tab: number = 1;
  users: IExtendedUserModel[] = [];
  selectedUsers: IExtendedUserModel[] = [];
  filter: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private chatService: ChatService,
    public modalService: ModalService,
    private router: Router,
    private eventBusService: EventBusService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        image: ['']
      }
    );
    this.userService.users().subscribe(resp => {
      this.users = resp;
      for (let i = 0; i < this.users.length; i++) {
        if(this.users[i].image) {
          this.users[i].image = environment.imageUrl + this.users[i].image;
        }
      }
    })
  }

  imageSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e =>  {
        this.selectedImage = reader.result;
        this.form.patchValue({ image: this.selectedImage  });
      };

      reader.readAsDataURL(file);
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.chatService.create(this.form.value).subscribe(
      resp => {
        this.modalService.close();
        this.eventBusService.emit(new EventData("ChatCreate", resp.id));
        this.router.navigate(['.'], {queryParams:{sel: resp?.id}, onSameUrlNavigation: "reload"});

        this.chatService.chat(resp?.id).subscribe(chat=>{
          if(this.selectedUsers.length > 0) {
            for (const user of this.selectedUsers) {
              this.chatService.inviteToChat(chat.id, user.id).subscribe();
              this.chatService.inviteToChatSignal(chat.id, user.id).then();
            }
          }
        })
      }
    );
  }

  goNext() {
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;
    this.tab = 2;
  }

  onCheckboxChange(user: IExtendedUserModel, check: boolean) {
    if(this.selectedUsers.indexOf(user) != -1) {
      this.selectedUsers.splice(this.selectedUsers.indexOf(user), 1)
    }

    check ? this.selectedUsers.push(user) : this.selectedUsers.splice(this.selectedUsers.indexOf(user), 1);
  }

  removeImage() {
    this.selectedImage = null;
    this.form.patchValue({ image: null  });
  }
}
