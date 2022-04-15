import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth-service";
import {ActivatedRoute} from "@angular/router";
import {TokenStorageService} from "../../service/token-storge-service";
import {User} from "../../model/app-user.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser!: User ;
  balance:number ;
  firstName!:string;

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
  private tokenS :TokenStorageService
  ) {
    let mail = tokenS.getUser();
    this.authService.getUserProfile().subscribe((res) => {
      this.currentUser = res.data.account;
      this.firstName =this.currentUser.firstName;
      this.balance =this.currentUser.balance;
    });
  }
  ngOnInit() {}

}
