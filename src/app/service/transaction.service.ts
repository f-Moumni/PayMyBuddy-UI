import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomResponse} from "../model/custom-response";
import {Payment} from "../model/payment.model";
import {OperationType} from "../enum/Operation.enum";



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
  getPaymentsSent(): Observable<any> {
    return this.http.get<CustomResponse>(API + `/payment/sent`, httpOptions);
  }
  getPaymentsReceived(): Observable<any> {
    return this.http.get<CustomResponse>(API + `/payment/received`, httpOptions);
  }

  addPayment(payment: Payment): Observable<any> {
    return this.http.post<any>(API + `/payment`,
      {
        creditAccountEmail: payment.creditAccountEmail,
        amount: payment.amount,
        description: payment.description
      }, httpOptions)
  }

  filterByOperation(operationType: OperationType, response: CustomResponse) {
    return new Observable<CustomResponse>(
      subscriber => {
        subscriber.next(
          (operationType===OperationType.ALL) ? {...response } :
            { ...response,
              data:{transactions:response.data.transactions.filter(t=>t.operationType===operationType)
            } }
        )
      }
    );

  }
}
