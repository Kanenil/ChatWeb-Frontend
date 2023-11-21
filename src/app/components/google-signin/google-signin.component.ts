import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'google-signin',
  templateUrl: './google-signin.component.html'
})
export class GoogleSigninComponent implements OnInit, OnDestroy {
  @Output() logined = new EventEmitter()
  @Input() title: string = 'Sign in with Google'

  private googleButtonWrapper: any;

  private createFakeGoogleWrapper() {
    const googleLoginWrapper = document.createElement("div");

    googleLoginWrapper.style.display = "none";
    googleLoginWrapper.id = "google-login";

    document.body.appendChild(googleLoginWrapper);

    // @ts-ignore
    window.google.accounts.id.renderButton(googleLoginWrapper, {
      type: "icon",
      width: "200",
    });

    const googleLoginWrapperButton =
      googleLoginWrapper.querySelector("div[role=button]");

    return {
      click: () => {
        // @ts-ignore
        googleLoginWrapperButton.click();
      },
    };
  }

  handleGoogleLogin() {
    this.googleButtonWrapper.click();
  }

  ngOnInit() {
    const googleLoginCallback = (response: any) => {
      this.logined.emit(response);
    }

    // @ts-ignore
    window.google.accounts.id.initialize({
      client_id: environment.googleClientId,
      ux_mode: "popup",
      callback: googleLoginCallback,
    });

    this.googleButtonWrapper = this.createFakeGoogleWrapper();
  }

  ngOnDestroy() {
    let google = document.querySelector('#google-login');
    if(google)
      google.remove()
  }
}
