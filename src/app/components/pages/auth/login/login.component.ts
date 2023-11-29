import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import jwt_decode from "jwt-decode";
import {IAuthResponseModel} from "../../../../models/auth/auth-response.model";
import {EventData} from "../../../../shared/event.class";
import {EventBusService} from "../../../../shared/event-bus.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router: Router,
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
        username: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
          ]
        ],
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

    this.authService.login(this.form.value).subscribe(resp => {
      this.saveAndRedirectToHome(resp);
    }, error => {
      if(error?.error?.ErrorMessage?.includes("Credentials for")) {
        this.f["password"].setErrors({'wrong':true})
      }
    })
  }

  private saveAndRedirectToHome(resp: IAuthResponseModel) {
    localStorage.setItem("Tokens", JSON.stringify(resp.tokens));
    this.eventBusService.emit(new EventData("Authorize", resp.tokens));
    this.router.navigate(['/chat'], {replaceUrl: true});
  }
}
