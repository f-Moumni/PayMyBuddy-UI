import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/token-storge-service";
import {ContactService} from "../../service/contact.service";
import {BehaviorSubject, catchError, filter, map, Observable, of, startWith, tap} from "rxjs";
import {AppState} from "../../model/app-state";
import {CustomResponse} from "../../model/custom-response";
import {DataState} from "../../enum/DataState.enum";
import {Contact} from "../../model/contact.model";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  appState$!: Observable<AppState<CustomResponse<Contact>>>;
  contacts$!: Observable<Contact[]>
  contactEmail!: string;
  readonly DataState = DataState;
  message = "";
  private dataSubject = new BehaviorSubject<CustomResponse<Contact>>(null);

  constructor(private token: TokenStorageService, private service: ContactService) {
  }

  ngOnInit(): void {
    this.appState$ = this.service.contacts$.pipe(
      map(response => {
          this.dataSubject.next(response);
          return {dataState: DataState.LOADED, appData: response}
        }
      ),
      startWith({dataState: DataState.LOADING}),
      catchError((error: string) => {
        return of({dataState: DataState.ERROR, error})
      })
    )

  }

  onAddContact(email: string) {
    this.appState$ = this.service.contact$(email).pipe(
      map(response => {
          this.dataSubject.next(
            {...response, data: {contacts: [...this.dataSubject.value.data.contacts, response.data.contact]}}
          );
          return {dataState: DataState.LOADED, appData: this.dataSubject.value}
        }
      ),
      startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
      catchError((error: string) => {
        return of({dataState: DataState.ERROR, error})
      }))

  }

  onRemove(contact: Contact) {
    this.appState$ = this.service.removeContact$(contact.email).pipe(
      map(response => {

          this.dataSubject.next(
            {...response, data: {contacts: this.dataSubject.value.data.contacts.filter(c => c.email !== contact.email)}}
          );
          return {dataState: DataState.LOADED, appData: this.dataSubject.value}
        }
      ),
      startWith({dataState: DataState.LOADED, appData: this.dataSubject.value}),
      catchError((error: string) => {
        return of({dataState: DataState.ERROR, error})
      }))
  }
}
