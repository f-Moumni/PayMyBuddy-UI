import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BankAccount} from "../model/bankAccount.model";


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

  saveBankAccount(bankAccount: BankAccount): Observable<any> {
    return this.http.post<any>(API + `/bankAccount`, {
      iban: bankAccount.iban,
      swift: bankAccount.swift
    }, httpOptions);
  }
  updateBankAccount(bankAccount: BankAccount): Observable<any> {
    return this.http.put<any>(API + `/bankAccount`, {
      iban: bankAccount.iban,
      swift: bankAccount.swift
    }, httpOptions);
  }

}
