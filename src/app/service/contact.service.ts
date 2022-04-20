import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
;
import { Observable} from "rxjs";

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

  public getContacts():Observable<any>{
  return this.http.get<any>(API + `/contact/all`, httpOptions);

}
  public addContact(contactEmail :string):Observable<any>{
  return this.http.post<any>(API + `/contact?mail=${contactEmail}`, httpOptions);
}


  public removeContact(contactEmail :string):Observable<any>{
    return this.http.delete<CustomResponse>(API + `/contact?mail=${contactEmail}`,httpOptions)
  }


}
