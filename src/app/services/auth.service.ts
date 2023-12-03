import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ILoginModel} from "../models/auth/login.model";
import {IAuthResponseModel} from "../models/auth/auth-response.model";
import {IRegisterModel} from "../models/auth/register.model";
import {IGoogleLoginModel} from "../models/auth/google-login.model";
import {IGoogleRegisterModel} from "../models/auth/google-register.model";
import {ITokenModel} from "../models/auth/token.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(model: ILoginModel) {
    return this.http.post<IAuthResponseModel>(`${environment.apiUrl}/auth/login`, model);
  }

  register(model: IRegisterModel) {
    return this.http.post<IAuthResponseModel>(`${environment.apiUrl}/auth/register`, model);
  }

  googleLogin(model: IGoogleLoginModel) {
    return this.http.post<IAuthResponseModel>(`${environment.apiUrl}/auth/google/login`, model);
  }

  googleRegister(model: IGoogleRegisterModel) {
    return this.http.post<IAuthResponseModel>(`${environment.apiUrl}/auth/google/register`, model);
  }

  refreshToken(model: ITokenModel) {
    return this.http.post<ITokenModel>(`${environment.apiUrl}/auth/refresh-token`, model);
  }

  async getAccessToken(): Promise<string> {
    let tokens = JSON.parse(localStorage.getItem("Tokens") || '{}')

    const response = await this.http.post<ITokenModel>(`${environment.apiUrl}/auth/refresh-token`, tokens).toPromise();

    localStorage.setItem("Tokens", JSON.stringify(response))

    // @ts-ignore
    return response.accessToken;
  }
}
