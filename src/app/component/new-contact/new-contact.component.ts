import {Component, OnInit} from '@angular/core';
import {ContactService} from "../../service/contact.service";
import {TokenStorageService} from "../../service/token-storge-service";
import {Contact} from "../../model/contact.model";
import {filter, map, Observable, tap} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {
// contact$: Observable<Contact> = new Observable<Contact>();
 // isSuccessful = false;
 // isFailed = false;
  contactEmail!: string;

  message = '';
  contact!: Contact;

  constructor(private contactService: ContactService, private fb: FormBuilder) {
  }
  ngOnInit(): void {

  }
  onAddContact() {
    this.contactService.addContact(this.contactEmail).subscribe(
      data => {
        this.message = data.message;
      },
      err => {
        this.message = err.error().message;
      }
    );
  }
}
