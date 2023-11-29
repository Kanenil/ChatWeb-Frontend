import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProfileModel} from "../models/account/profile.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }

  profile() {
    return this.http.get<IProfileModel>(`${environment.apiUrl}/account`);
  }

  logout() {
    return this.http.post<any>(`${environment.apiUrl}/account/logout`, {});
  }
}
