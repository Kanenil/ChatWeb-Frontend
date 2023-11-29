import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ModalService} from "../../../services/modal.service";
import {ChatService} from "../../../services/chat.service";

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html'
})
export class CreateChatComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private chatService: ChatService,
    public modalService: ModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
      }
    );
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
        this.chatService.chat(resp?.id).subscribe(course=>{
          this.modalService.close();
          this.router.navigate(['/chat'], {queryParams:{chat: resp?.id}, onSameUrlNavigation: "reload"});
        })
      }
    );
  }
}
