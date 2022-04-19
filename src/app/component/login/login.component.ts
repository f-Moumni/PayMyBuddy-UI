import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth-service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../service/token-storge-service";
import {take, tap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;
  isLoggedIn :boolean;
  errorMessage: string;
  checked :boolean= false;



  constructor(private authService: AuthService, private fb :FormBuilder,private tokenStorage: TokenStorageService,private router: Router) {
    this.signInForm =this.fb.group({
      mail: [null,[
        Validators.required,
        Validators.email,
      ]],
      password: [null,Validators.required],
      }
    )
  }


  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      //  this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onLogin(): void {
 /*   this.authService.login(this.signInForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data.mail);
        this.router.navigate([`home`])
      }
    );*/
    this.authService.login(this.signInForm.value).pipe(
      take(1),
      tap(event => {
        this.tokenStorage.saveToken(event.accessToken,this.checked);
        this.router.navigate([`home`])
      }, (err: HttpErrorResponse) => {
        this.isLoggedIn = false
        this.errorMessage ="email and/or the password are not correct. "
      })
    ).subscribe();
  }


  onSignUp() : void{
    this.router.navigateByUrl(`register`);
  }


}
