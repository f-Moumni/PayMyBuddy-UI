import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TransactionService} from "../../service/transaction.service";
import {ContactService} from "../../service/contact.service";
import {BehaviorSubject, filter, map, Observable, take, tap} from "rxjs";
import {CustomResponse} from "../../model/custom-response";
import {Contact} from "../../model/contact.model";
import {Payment} from "../../model/payment.model";
import {HttpErrorResponse} from "@angular/common/http";
import {OperationType} from "../../enum/Operation.enum";
import {TransactionType} from "../../enum/TransactionType";

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
  contacts$!: Observable<CustomResponse>;
  transactions$!: Observable<CustomResponse>;
  selectedContact: Contact;
  payment: Payment;
  message: string;
  errorMessage: string;
  isSuccessful: boolean;
  readonly OperationType = OperationType;
  private dataSubject = new BehaviorSubject<CustomResponse>(null);

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
    this.getTransactions()
  }

  doDisplaySendMoney() {
    this.errorMessage = "";
    this.message = "";
    this.isSuccessful = null;
    this.contacts$ = this.contactService.contacts$;
    this.sendMoneyForm.reset()
    this.displaySendMoneyForm = true;
    this.displayReloadForm = false;
    this.displayBTransferForm = false;
  }

  doDisplayReload() {
    this.errorMessage = "";
    this.message = "";
    this.isSuccessful = null;
    this.reloadForm.reset()
    this.displaySendMoneyForm = false;
    this.displayReloadForm = true;
    this.displayBTransferForm = false;
  }

  doDisplayBankTransfer() {
    this.errorMessage = "";
    this.message = "";
    this.isSuccessful = null;
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
    this.payment = this.sendMoneyForm.value
    this.payment.creditAccountEmail = this.contactEmail
    this.transactionService.addPayment(this.payment).pipe(
      take(1),
      tap(event => {
        this.isSuccessful = true
        this.message = event.message
        this.getTransactions()
      }, (err: HttpErrorResponse) => {
        this.isSuccessful = false
        this.errorMessage = err.error.message
      })).subscribe();

  }

  getTransactions() {
    this.transactions$ = this.transactionService.getTransactions()

  }

  onChange(contact: Contact) {
    this.contactEmail = contact.email;
    console.log(this.contactEmail)
  }

  doFilterByTransaction(transactionType:TransactionType): void{
    switch(transactionType) {
      case transactionType=TransactionType.ALL: {
        this.transactions$ = this.transactionService.getTransactions().pipe(
          tap(response => {
            this.dataSubject.next(response);
          }
        ))

        break;
      }
      case transactionType=TransactionType.TRANSFER: {
        this.transactions$ = this.transactionService.getTransfers().pipe(
          tap(response => {
              this.dataSubject.next(response);
            }
          ))
        break;
      }
      case transactionType=TransactionType.PAYMENT: {
        this.transactions$ = this.transactionService.getPayments().pipe(
          tap(response => {
              this.dataSubject.next(response);
            }
          ))
        break;
      }
      default: {
        this.transactions$ = this.transactionService.getTransactions().pipe(
          tap(response => {
              this.dataSubject.next(response);
            }
          ))
        break;
      }
    }
  }
  doFilterByOperation(operationType: OperationType){
    this.transactions$= this.transactionService.filterByOperation(operationType,this.dataSubject.value)

  }

}

