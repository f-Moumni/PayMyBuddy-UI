import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storge-service";
import {catchError, Observable, tap, throwError} from "rxjs";
import {Contact} from "../model/contact.model";
import {environment} from "../../environments/environment";
import {CustomResponse} from "../model/custom-response";

const API = environment.AUTH_API;
const httpOptions =environment.httpOptions

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {

  }

  /*searchContact(mail: string | null):Observable<any> {
    return this.http.get<any>(AUTH_API + `contact?mail=${mail}`,httpOptions)
  }*/

  contacts$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(API + `/contact/all`,httpOptions)
      .pipe(
        catchError(this.handleError)
  );
  contact$ = (contactEmail :string) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(API + `/contact?mail=${contactEmail}`,httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  removeContact$=(contactEmail :string) => <Observable<CustomResponse>>
    this.http.delete<CustomResponse>(API + `/contact?mail=${contactEmail}`,httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  public deleteContact(contactEmail:string): Observable<any> {
    return  this.http.delete<any>(API + `/contact?mail=${contactEmail}`,httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  private // Error
  handleError(error: any) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
