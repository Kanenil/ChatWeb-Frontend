import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IExtendedUserModel} from "../models/user/extended-user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  users(searchBy: string = '') {
    return this.http.get<IExtendedUserModel[]>(`${environment.apiUrl}/users${searchBy?`?searchBy=${searchBy}`:''}`);
  }
}
