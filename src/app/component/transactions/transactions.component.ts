import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
import {Transaction} from "../../model/transaction.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {BankService} from "../../service/bank.service";
import {Transfer} from "../../model/transfer.model";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit , AfterViewInit {
  sendMoneyForm: FormGroup;
  bTransferForm: FormGroup;
  displaySendMoneyForm = false;
  displayReloadForm = false;
  displayBTransferForm = false;
  contactEmail!: string;
  iban!:string;
  contacts$!: Observable<CustomResponse>;
  transactions$!: Observable<MatTableDataSource<Transaction>>;
  selectedContact: Contact;
  payment: Payment;
  transfer:Transfer;
  message: string;
  errorMessage: string;
  isSuccessful: boolean;
  isLoaded: boolean;
  readonly OperationType = OperationType;
  private dataSubject = new BehaviorSubject<Transaction[]>(null);

  dataSource: MatTableDataSource<Transaction>;
  displayedColumns: string[] = ['name', 'description', 'date-Hour', 'amount','operationType'];
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private contactService: ContactService,
    private bankService : BankService,
    private router: Router
  ) {
    this.sendMoneyForm = this.fb.group({
      amount: [0,
        Validators.required,
      ],
      description: ["",  Validators.required,
      ],

    });
    this.bTransferForm = this.fb.group({
      operationType :[null,Validators.required],
      amount: [0, Validators.required],
      description: ["",  Validators.required],

    });

  }
goBankAccount(): void{
    this.router.navigate(['bank-account'])
}

  ngOnInit(): void {
    this.getTransactions()
  }

  doDisplaySendMoney() {
    this.errorMessage = "";
    this.message = "";
    this.isSuccessful = null;
    this.contacts$ = this.contactService.getContacts();
    this.sendMoneyForm.reset()
    this.displaySendMoneyForm = true;
    this.displayReloadForm = false;
    this.displayBTransferForm = false;
  }

  doDisplayBankTransfer() {
    this.errorMessage = "";
    this.message = "";
    this.isSuccessful = null;
    this.bTransferForm.reset()
    this.getIban();
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
getIban(){
    this.bankService.getBankAccount().pipe(
      take(1),
      tap(event => {
        this. isLoaded = true
       this.iban = event.data.bankAccount.iban;
      }, (err: HttpErrorResponse) => {
        this. isLoaded = false
      })).subscribe();
}
  doTransfer() {
    this.transfer = this.bTransferForm.value
   // this.payment.creditAccountEmail = this.contactEmail
    this.transactionService.addTransfer(this.transfer).pipe(
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
    this.transactions$ = this.transactionService.getTransactions().pipe(
      map( response => {
     this.dataSource = new MatTableDataSource<Transaction>(response.data.transactions);
        this.dataSource.paginator = this.paginator;
        return this.dataSource
      })
    )

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
          this.dataSubject.next(response.data.transactions);
          }),
          map( response => {
            this.dataSource = new MatTableDataSource<Transaction>(response.data.transactions);
            this.dataSource.paginator = this.paginator;
            return this.dataSource
          },
        )
          );
        break;
      }
      case transactionType=TransactionType.TRANSFER: {
        this.transactions$ = this.transactionService.getTransfers().pipe(
          tap(response => {
              this.dataSubject.next(response.data.transactions);
            }),
          map( response => {
            this.dataSource = new MatTableDataSource<Transaction>(response.data.transactions);
            this.dataSource.paginator = this.paginator;
            return this.dataSource
          }
        ));
        break;
      }
      case transactionType=TransactionType.PAYMENT: {
        this.transactions$ = this.transactionService.getPayments().pipe(
          tap(response => {
              this.dataSubject.next(response.data.transactions);
            }
          ),
          map( response => {
            this.dataSource = new MatTableDataSource<Transaction>(response.data.transactions);
            this.dataSource.paginator = this.paginator;
            return this.dataSource
          })
        )
        break;
      }
      default: {
        this.transactions$ = this.transactionService.getTransactions().pipe(
          tap(response => {
              this.dataSubject.next(response.data.transactions);
            }
          ),  map( response => {
            this.dataSource = new MatTableDataSource<Transaction>(response.data.transactions);
            this.dataSource.paginator = this.paginator;
            return this.dataSource
          }))
        break;
      }
    }
  }
  doFilterByOperation(operationType: OperationType){
    this.transactions$= this.transactionService.filterByOperation(operationType,this.dataSubject.value).pipe(
      map( response => {
        this.dataSource = new MatTableDataSource<Transaction>(response);
        this.dataSource.paginator = this.paginator;
        return this.dataSource
      })
    )

  }
  ngAfterViewInit() {
    //  this.dataSource.paginator = this.paginator;
  }
}

