import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../../services/modal.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {AccountService} from "../../../services/account.service";
import {IProfileModel} from "../../../models/account/profile.model";
import {environment} from "../../../../environments/environment";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventData} from "../../../shared/event.class";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  // @ts-ignore
  loggedUser: IProfileModel;
  isEditing: boolean  = false;
  form: FormGroup = new FormGroup({
    userName: new FormControl(''),
    image: new FormControl(''),
    id: new FormControl(0)
  });
  submitted = false;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    public modalService: ModalService,
    private route: ActivatedRoute,
    private userService: UserService,
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.accountService.profile().subscribe(resp => {
      this.loggedUser = resp;

      this.form = this.formBuilder.group(
        {
          userName: [''],
          id: [resp.id, [Validators.required]],
          image: ['']
        }
      );
      this.form.patchValue({ image: resp.image  });

      if(resp.image) {
        this.selectedImage =  environment.imageUrl +resp.image;
        this.loggedUser.image = environment.imageUrl + this.loggedUser.image;
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

    this.accountService.edit(this.form.value).subscribe(resp => {
      this.isEditing = false;
      this.loggedUser = resp;

      this.form = this.formBuilder.group(
        {
          userName: [''],
          id: [resp.id, [Validators.required]],
          image: ['']
        }
      );
      this.form.patchValue({ image: resp.image  });

      if(resp.image) {
        this.selectedImage =  environment.imageUrl +resp.image;
        this.loggedUser.image = environment.imageUrl + this.loggedUser.image;
      }
    })
  }

  removeImage() {
    this.selectedImage = null;
    this.form.patchValue({ image: null  });
  }
}
