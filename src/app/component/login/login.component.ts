import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth-service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../service/token-storge-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;



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

  onSubmitForm(): void {
    this.authService.login(this.signInForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data.mail);
        this.router.navigate([`home`])
      }
    );
  }

 /* reloadPage(): void {
    window.location.reload();
  }*/



  onSignUp() : void{
    this.router.navigateByUrl(`register`);
  }
}
