import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


const API = environment.AUTH_API;
const httpOptions = environment.httpOptions

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) {
  }

  getBankAccount(): Observable<any> {
    return this.http.get<any>(API + `/bankAccount`, httpOptions);
  }


}
