import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../model/app-user.model";

const AUTH_API = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private http: HttpClient) { }

  login( formValue :{mail: string, password: string}): Observable<any> {
    return this.http.post(AUTH_API + 'sign-in', {
     ...formValue
    }, httpOptions);
  }

  signUp(user: User): Observable<any> {
    return this.http.post(AUTH_API + 'api/sign-up', {
      firstName: user.firstName,
      lastName : user.lastName,
      birthDate : user.birthdate,
      mail: user.email,
      password: user.password
    }, httpOptions);
  }
}
