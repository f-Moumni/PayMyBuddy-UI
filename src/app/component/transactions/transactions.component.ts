import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth-service";
import {Router} from "@angular/router";
import {TransactionService} from "../../service/transaction.service";
import {ContactService} from "../../service/contact.service";
import {catchError, map, Observable, of, startWith, take, tap} from "rxjs";
import {CustomResponse} from "../../model/custom-response";
import {DataState} from "../../enum/DataState.enum";
import {AppState} from "../../model/app-state";
import {Contact} from "../../model/contact.model";
import {Payment} from "../../model/payment.model";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  sendMoneyForm: FormGroup;
  reloadForm: FormGroup;
  bTransferForm: FormGroup;
  displaySendMoneyForm = false;
  displayReloadForm = false;
  displayBTransferForm = false;
  contactEmail!: string;
  appState$!: Observable<AppState<CustomResponse>>;
  contacts$!: Observable<CustomResponse>;
  selectedContact: Contact;
  payment: Payment;
  message: string;
  errorMessage: string;
  isSuccessful: boolean ;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private contactService: ContactService,
    private router: Router
  ) {
    this.sendMoneyForm = this.fb.group({

      amount: [0,
        Validators.required,
      ],
      description: [""],

    });
    this.reloadForm = this.fb.group({
      amountReload: [0,
        Validators.required,
      ],
      descriptionReload: [""],

    });
    this.bTransferForm = this.fb.group({
      amountBTransfer: [0,
        Validators.required,
      ],
      descriptionBTransfer: [""],

    });

  }

  ngOnInit(): void {
    /* this.appState$ = this.contactService.contacts$.pipe(
       map(response => {
           return {dataState: DataState.LOADED, appData: response}
         }
       ),
       startWith({dataState: DataState.LOADING}),
       catchError((error: string) => {
         return of({dataState: DataState.ERROR, error})
       })
     )*/
  }

  doDisplaySendMoney() {
    this.contacts$ = this.contactService.contacts$;
    this.sendMoneyForm.reset()
    this.displaySendMoneyForm = true;
    this.displayReloadForm = false;
    this.displayBTransferForm = false;
  }

  doDisplayReload() {
    this.reloadForm.reset()
    this.displaySendMoneyForm = false;
    this.displayReloadForm = true;
    this.displayBTransferForm = false;
  }

  doDisplayBankTransfer() {
    this.bTransferForm.reset()
    this.displaySendMoneyForm = false;
    this.displayReloadForm = false;
    this.displayBTransferForm = true;
  }

  doCancel() {
    this.displaySendMoneyForm = false;
    this.displayReloadForm = false;
    this.displayBTransferForm = false;
  }

  doPayment() {
    this.isSuccessful = true
    this.payment = this.sendMoneyForm.value
    this.payment.creditAccountEmail = this.contactEmail
    this.transactionService.addPayment(this.payment).pipe(
      take(1),
      tap( event=>{

      },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            this.isSuccessful = false;
            this.errorMessage = err.error.message
          }
        })
    ).subscribe()
    if (this.isSuccessful == true) {
      this.displaySendMoneyForm = false

    }
  }

  onChange(contact: Contact) {
    this.contactEmail = contact.email;
    console.log(this.contactEmail)
  }
}
