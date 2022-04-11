import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storge-service";
import {Observable} from "rxjs";
import {Contact} from "../model/contact.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*' })
};
const AUTH_API = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
currentUserMail !:string;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private http: HttpClient,private tokenStorage :TokenStorageService) {
    this.currentUserMail = tokenStorage.getUser();
  }

  searchContact(mail: string | null):Observable<any> {
    return this.http.get<any>(AUTH_API + `contact?mail=${mail}`,httpOptions)
  }

  addContact(contactEmail: string) :Observable<any>{
    return this.http.post<any>(AUTH_API + 'contact',
      {
        contactMail:contactEmail,
        mail: this.currentUserMail
      }
      , httpOptions);
  }

}
