import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LayoutModule} from "./components/layout/layout.module";
import {PagesModule} from "./components/pages/pages.module";
import {HttpClientModule} from "@angular/common/http";
import {authInterceptorProviders} from "./interseptors/auth.interceptor";
import {PipesModule} from "./pipes/pipes.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    PagesModule,
    HttpClientModule,
    PipesModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
