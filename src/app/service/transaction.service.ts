import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomResponse} from "../model/custom-response";
import {Payment} from "../model/payment.model";
import {OperationType} from "../enum/Operation.enum";
import {Transaction} from "../model/transaction.model";
import {Transfer} from "../model/transfer.model";



const API = environment.AUTH_API;
const httpOptions = environment.httpOptions

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private http: HttpClient) {
  }

  getTransactions(): Observable<any> {
    return this.http.get<CustomResponse>(API + `/transactions`, httpOptions);
  }
  getPayments(): Observable<any> {
    return this.http.get<CustomResponse>(API + `/payment/all`, httpOptions);
  }
  getTransfers(): Observable<any> {
    return this.http.get<CustomResponse>(API + `/transfer/all`, httpOptions);
  }

  addPayment(payment: Payment): Observable<any> {
    return this.http.post<any>(API + `/payment`,
      {
        creditAccountEmail: payment.creditAccountEmail,
        amount: payment.amount,
        description: payment.description
      }, httpOptions)
  }

  filterByOperation(operationType: OperationType, response: Transaction[]) {
    return new Observable<Transaction[]>(
      subscriber => {
        subscriber.next(
          (operationType===OperationType.ALL) ?  response  :
             response.filter(t=>t.operationType===operationType))
             }
        )
      }


  addTransfer(transfer: Transfer):Observable<any> {
    return this.http.post<any>(API + `/transfer`,
      {
        amount: transfer.amount,
        description: transfer.description,
        operationType: transfer.operationType
      }, httpOptions)
  }
}
