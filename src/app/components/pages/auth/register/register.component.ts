import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {EventBusService} from "../../../../shared/event-bus.service";
import {Router} from "@angular/router";
import {IAuthResponseModel} from "../../../../models/auth/auth-response.model";
import {EventData} from "../../../../shared/event.class";
import jwt_decode from "jwt-decode";
import Validation from "../../../../utils/validation";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    terms: new FormControl(false)
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router: Router
  ) { }

  googleLogin(response: any) {
    this.authService.googleLogin({googleToken: response.credential}).subscribe((resp) => {
      this.saveAndRedirectToHome(resp);
    }, error => {
      if (error.error.ErrorMessage === 'GoogleLogin: User not found.') {
        const decodedToken = jwt_decode<{
          given_name: string,
          family_name: string,
          picture: string
        }>(response.credential)
        this.router.navigate(['/auth', 'google-finish'], {
          queryParams: {
            token: response.credential,
            firstName: decodedToken.given_name || '',
            lastName: decodedToken.family_name || '',
            image: decodedToken.picture || '',
          }
        })
      }
    })
  }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        userName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
          ]
        ],
        confirmPassword: ['', Validators.required],
        terms: [false,Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
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

    this.authService.register(this.form.value).subscribe(
      resp => {
        this.saveAndRedirectToHome(resp);
      }, error => {
        if(error.error.ErrorMessage.includes('already exists')){
          this.f["email"].setErrors({'exists':true})
        }
      }
    );

  }

  private saveAndRedirectToHome(resp: IAuthResponseModel) {
    localStorage.setItem("Tokens", JSON.stringify(resp.tokens));
    this.eventBusService.emit(new EventData("Authorize", resp.tokens));
    this.router.navigate(['/chat'], {replaceUrl: true});
  }
}
