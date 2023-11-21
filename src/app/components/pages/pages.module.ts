import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {RouterLink} from "@angular/router";
import { LoginComponent } from './auth/login/login.component';
import {GoogleSigninModule} from "../google-signin/google-signin.module";
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './auth/register/register.component';
import { GoogleFinishComponent } from './auth/google-finish/google-finish.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    GoogleFinishComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    GoogleSigninModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
