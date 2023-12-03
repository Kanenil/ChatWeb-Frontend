import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../../services/chat.service";
import {ModalService} from "../../../services/modal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {IChatModel} from "../../../models/chat/chat.model";
import {UsersInChatComponent} from "../users-in-chat/users-in-chat.component";

@Component({
  selector: 'app-edit-chat',
  templateUrl: './edit-chat.component.html'
})
export class EditChatComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    image: new FormControl(''),
    id: new FormControl(0),
  });
  submitted = false;
  selectedImage: string | ArrayBuffer | null = null;
  // @ts-ignore
  chat: IChatModel;

  constructor(
    private formBuilder: FormBuilder,
    private chatService: ChatService,
    public modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const sel: string | null = this.route.snapshot.queryParamMap.get('sel');

    if(sel) {
      this.chatService.chat(sel).subscribe(resp=>{
        this.chat = resp;
        this.form = this.formBuilder.group(
          {
            name: [resp.name, [Validators.required]],
            id: [resp.id, [Validators.required]],
            image: ['']
          }
        );
        this.form.patchValue({ image: resp.name  });

        if(resp.image) {
          this.selectedImage = environment.imageUrl + resp.image;
        }
      });
    }
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

  removeImage() {
    this.selectedImage = null;
    this.form.patchValue({ image: null  });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.chatService.edit(this.form.value).subscribe(
      resp => {
        this.chatService.updateChat(resp.id).then();
        this.modalService.close();
        //location.reload();
      }
    );
  }

  goBack() {
    this.modalService.show(UsersInChatComponent);
  }
}
