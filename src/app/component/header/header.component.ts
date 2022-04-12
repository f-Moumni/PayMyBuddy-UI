import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../../service/token-storge-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
currentUserEmail !:string;
  constructor(private router :Router, private token :TokenStorageService) { }

  ngOnInit(): void {
    this.currentUserEmail =this.token.getUser();
  }


}
