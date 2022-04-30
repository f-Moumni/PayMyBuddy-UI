import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TransactionService} from "../../service/transaction.service";
import {ContactService} from "../../service/contact.service";
import {BankService} from "../../service/bank.service";
import {Router} from "@angular/router";
import {take, tap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../service/auth-service";

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {
  isLoaded: boolean ;
  bTransferForm: FormGroup;
  isSuccessful: boolean;
  errorMessage: string;
  message: string;

  constructor(
    private router :Router,
    private fb: FormBuilder,
    private bankService : BankService,
  ) {
    this.bTransferForm = this.fb.group({
      iban: ["", Validators.required],
      swift: ["",  Validators.required],

    });
  }

  ngOnInit(): void {
    if (AuthService.authenticated){
      this.bankService.getBankAccount().pipe(
        take(1),
        tap(event => {
          this. isLoaded = true
          this.bTransferForm.setValue({
            iban: event.data.bankAccount.iban,
            swift: event.data.bankAccount.swift
          }) ;
        }, (err: HttpErrorResponse) => {
          this. isLoaded = false
        })).subscribe()} else {
      this.router.navigate(['login'])
    };

  }

  doSaveBA() {
    this.bankService.saveBankAccount(this.bTransferForm.value).pipe(
      take(1),
      tap(event => {
        this.isSuccessful = true
        this.message = event.message
      }, (err: HttpErrorResponse) => {
        this.isSuccessful = false
        this.errorMessage = err.error.message
      })).subscribe();
  }

  doUpdateBA() {
    this.bankService.updateBankAccount(this.bTransferForm.value).pipe(
      take(1),
      tap(event => {
        this.isSuccessful = true
        this.message = event.message
      }, (err: HttpErrorResponse) => {
        this.isSuccessful = false
        this.errorMessage = err.error.message
      })).subscribe();
  }

  doReset() {
    this.bTransferForm.reset()
  }
}
