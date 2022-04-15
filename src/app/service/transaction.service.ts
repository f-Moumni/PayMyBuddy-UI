import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {CustomResponse} from "../model/custom-response";
import {Payment} from "../model/payment.model";
import {User} from "../model/app-user.model";


const API = environment.AUTH_API;
const httpOptions = environment.httpOptions

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private http: HttpClient) {
  }

  transactions$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(API + `/transactions`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  Payments$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(API + `/payment/All`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  PaymentsSent$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(API + `/payment/sent`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  PaymentsReceived$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(API + `/payment/received`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );

  newPayment$ = (payment: Payment) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(API + `/payment`,
      {
      creditAccountEmail: payment.creditAccountEmail,
      amount: payment.amount,
      description: payment.description
    }, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  addPayment(payment: Payment): Observable<any> {
    return this.http.post<any>(API + `/payment`,
      {
        creditAccountEmail: payment.creditAccountEmail,
        amount: payment.amount,
        description: payment.description
      }, httpOptions)
  }

  private // Error
  handleError(error: HttpErrorResponse) {
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
