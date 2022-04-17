import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { AppComponent } from './app.component';

import { HeaderComponent } from './component/header/header.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './component/login/login.component';
import {AppRoutingModule} from "./app-routing.module";
import { RegistrationComponent } from './component/registration/registration.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { HomeComponent } from './component/home/home.component';

import { ContactsComponent } from './component/contacts/contacts.component';
import { TransactionsComponent } from './component/transactions/transactions.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    UserProfileComponent,
    HomeComponent,

    ContactsComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    { provide: LOCALE_ID,
      useValue: 'fr-FR'}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
