import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
