import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultComponent} from "./components/layout/default/default.component";
import {HomeComponent} from "./components/pages/home/home.component";
import {IsSignedInGuard} from "./guards/is-signed-in.guard";
import {LoginComponent} from "./components/pages/auth/login/login.component";
import {RegisterComponent} from "./components/pages/auth/register/register.component";
import {GoogleFinishComponent} from "./components/pages/auth/google-finish/google-finish.component";

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    canActivate: [IsSignedInGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {title: 'Home'}
      },
      {
        path:'auth',
        children: [
          {
            path: 'login',
            component: LoginComponent,
            data: {title: 'Login'}
          },
          {
            path: 'register',
            component: RegisterComponent,
            data: {title: 'Register'}
          },
          {
            path: 'google-finish',
            component: GoogleFinishComponent,
            data: {title: 'Finish Google'}
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
