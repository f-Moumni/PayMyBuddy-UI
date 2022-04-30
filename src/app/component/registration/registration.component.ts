import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth-service";
import {Router} from "@angular/router";
import {take, tap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  isSuccessful: boolean;
  signupForm: FormGroup;
  errorMessage: String;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: [null,
        Validators.required,
      ],
      lastName: [null,
        Validators.required,
      ],
      birthdate: [null,Validators.required],
      mail: [null,[
        Validators.required,
        Validators.email,
      ]],
      password: [null,Validators.required],
    });
  }
  ngOnInit() {}
  registerUser() {
    this.authService.signUp(this.signupForm.value).pipe(
      take(1),
      tap(event => {
          this.isSuccessful = true;
      }, (err: HttpErrorResponse) => {
         this.isSuccessful = false;
        this.errorMessage = err.error.message;
      })).subscribe()}







}
