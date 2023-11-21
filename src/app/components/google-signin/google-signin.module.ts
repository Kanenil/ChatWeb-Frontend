import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GoogleSigninComponent} from "./google-signin.component";



@NgModule({
  declarations: [
    GoogleSigninComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GoogleSigninComponent
  ]
})
export class GoogleSigninModule { }
