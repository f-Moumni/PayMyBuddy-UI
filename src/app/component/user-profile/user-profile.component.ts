import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProfileService} from "../../service/profile.service";
import {take, tap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../model/app-user.model";
import {AuthService} from "../../service/auth-service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  message !: string;
  profileForm: FormGroup;
  isLoaded: boolean;
  password: string;
  errorMessage: string;
  isSuccessful: boolean;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      balance: [0],
      firstName: [null,
        Validators.required,
      ],
      lastName: [null,
        Validators.required,
      ],
      birthdate: [null, Validators.required],
      mail: [null, [
        Validators.required,
        Validators.email,
      ]],

    });
  }

  ngOnInit() {
    if (AuthService.authenticated){
    this.isSuccessful = null;
    this.profileService.getProfile().pipe(
      take(1),
      tap(event => {
        this.isLoaded = true,
          this.profileForm.setValue({
            firstName: event.data.account.firstName,
            lastName: event.data.account.lastName,
            birthdate: event.data.account.birthdate,
            balance: event.data.account.balance,
            mail: event.data.account.mail,
          })
      }, (err: HttpErrorResponse) => {
        this.isLoaded = false
      })
    ).subscribe();} else {    this.router.navigate(['login'])}
  }

  doUpdateProfile() {
    let user: User;
    user = this.profileForm.value;
    if (this.password !== null) {
      user.password = this.password;
    }
    this.profileService.updateProfile(user).pipe(
      take(1),
      tap(event => {
        this.isSuccessful = true
        this.message = event.message
      }, (err: HttpErrorResponse) => {
        this.isSuccessful = false
        this.errorMessage = err.error.message
      })).subscribe();
  }

  doDeleteProfile() {
    this.profileService.deleteProfile().pipe(
      take(1),
      tap(event => {
        this.isSuccessful = true
        this.router.navigate(['login'])
      }, (err: HttpErrorResponse) => {
        this.isSuccessful = false
        this.errorMessage = err.error.message
      })).subscribe();
  }
}
