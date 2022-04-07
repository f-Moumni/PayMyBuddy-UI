import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  message = '';
  signupForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: [null, [
        Validators.required,
        Validators.minLength(3),
      ]],
      lastName: [null,[
        Validators.required,
        Validators.minLength(3),
      ]],
      birthdate: [null,Validators.required],
      email: [null,[
        Validators.required,
        Validators.email,
      ]],
      password: [null,Validators.required],
    });
  }
  ngOnInit() {}
  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe(
      data => {
        if (data.statusCode!==201){
          this.isSuccessful = false;
          this.isSignUpFailed = true;
         // this.signupForm.reset();
        //  this.router.navigateByUrl('login')
        }else{
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        } ;
        this.message = data.message;


    /*  if (res.result) {

      }*/
    });
  }

}