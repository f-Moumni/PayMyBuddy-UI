import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/token-storge-service";
import {ContactService} from "../../service/contact.service";
import {BehaviorSubject, map, Observable, take, tap} from "rxjs";

import {CustomResponse} from "../../model/custom-response";

import {Contact} from "../../model/contact.model";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../service/auth-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];
  contactEmail!: string;
  isSuccessful: boolean;
  dataSubject = new BehaviorSubject<Contact[]>(null);
  errorMessage: string;

  constructor(private router :Router ,
              private token: TokenStorageService
              , private contactService: ContactService) {
  }

  ngOnInit(): void { if (AuthService.authenticated){
    this.getContacts();
  }else {
    this.router.navigate(['login'])
  }
  }

  getContacts() {
    this.contactService.getContacts().pipe(
      take(1),
      map(response => {
        this.contacts=response.data.contacts;
        this.dataSubject.next( response.data.contacts);
        return response.data.contacts
      })
    ).subscribe()
  }

  doAddContact(email: string) {
    this.contactService.addContact(email).pipe(
      take(1),
      tap(event => {
          this.dataSubject.next([
            ...this.dataSubject.value,event.data.contact])
           this.contacts = this.dataSubject.value;
          this.isSuccessful = true;
        },
        (err: HttpErrorResponse) =>{
          this.isSuccessful = false;
          this.errorMessage = err.error.message
        }
      )
    ).subscribe()
    this.contactEmail = "";
  }

  doRemove(contact: Contact) {
    this.contactService.removeContact(contact.email).pipe(
      take(1),
      tap(event => {
          this.dataSubject.next([
            ...this.dataSubject.value.filter((c => c.email !== contact.email))]
          )
          this.contacts = this.dataSubject.value;
          this.isSuccessful = true;
        },
        (err: HttpErrorResponse) =>{
          this.isSuccessful = false;
          this.errorMessage = err.error.message
        }
      )
    ).subscribe()
    this.getContacts();
  }
}
