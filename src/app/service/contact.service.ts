import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storge-service";
import {catchError, Observable, tap, throwError} from "rxjs";
import {Contact} from "../model/contact.model";
import {environment} from "../../environments/environment";
import {CustomResponse} from "../model/custom-response";

const AUTH_API = environment.AUTH_API;

const httpOptions =environment.httpOptions

@Injectable({
  providedIn: 'root'
})
export class ContactService {
currentUserMail !:string;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
//  contacts$!:Observable<CustomResponse>;

  constructor(private http: HttpClient,private tokenStorage :TokenStorageService) {
    this.currentUserMail = tokenStorage.getUser();
  }

  /*searchContact(mail: string | null):Observable<any> {
    return this.http.get<any>(AUTH_API + `contact?mail=${mail}`,httpOptions)
  }*/

  contacts$ =  <Observable<CustomResponse<Contact>>>
    this.http.get<CustomResponse<Contact>>(AUTH_API + `contact/all?mail=${this.tokenStorage.getUser()}`,httpOptions)
      .pipe(
        catchError(this.handleError)
  );
  contact$ = (contactEmail :string) => <Observable<CustomResponse<Contact>>>
    this.http.post<CustomResponse<Contact>>(AUTH_API + 'contact',{
      contactMail:contactEmail,
      mail: this.currentUserMail
    },httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  removeContact$=(contactEmail :string) => <Observable<CustomResponse<Contact>>>
    this.http.put<CustomResponse<Contact>>(AUTH_API + 'contact',{
      contactMail:contactEmail,
      mail: this.currentUserMail
    },httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  /*getAllContacts():Observable<any> {
    return this.http.get<any>(AUTH_API + `contact/all?mail=${this.tokenStorage.getUser()}`,httpOptions)
  }
 /* addContact(contactEmail: string) :Observable<any>{
    return this.http.post<any>(AUTH_API + 'contact',
      {
        contactMail:contactEmail,
        mail: this.currentUserMail
      }
      , httpOptions);
  }*/

  private handleError(error:HttpErrorResponse) :Observable<never>{
    console.log(error)
    return throwError(`an error occurred  :${error.message}`)
  }
}
