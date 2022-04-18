import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BankAccount} from "../model/bankAccount.model";
import {Observable} from "rxjs";
import {User} from "../model/app-user.model";
import {environment} from "../../environments/environment";
const API = environment.AUTH_API;
const httpOptions = environment.httpOptions
@Injectable({
  providedIn: 'root'
})

export class ProfileService {


  constructor(private http: HttpClient) {
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(API + `/api/account`, httpOptions);
  }
  deleteProfile(): Observable<any> {
    return this.http.delete<any>(API + `/api/account`, httpOptions);
  }
  updateProfile(user: User): Observable<any> {
    return this.http.put<any>(API + `/api/account`, {
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate:user.birthdate,
      mail: user.mail,
      password:user.password
    }, httpOptions);
  }
}
