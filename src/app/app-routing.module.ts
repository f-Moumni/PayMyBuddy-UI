import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./component/login/login.component";
import {RegistrationComponent} from "./component/registration/registration.component";
import {UserProfileComponent} from "./component/user-profile/user-profile.component";
import {HomeComponent} from "./component/home/home.component";
import {ContactsComponent} from "./component/contacts/contacts.component";
import {TransactionsComponent} from "./component/transactions/transactions.component";
import {BankAccountComponent} from "./component/bank-account/bank-account.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo:'login' ,pathMatch: 'full' },
  {path: 'register', component: RegistrationComponent},
  {path: 'contacts', component: ContactsComponent},
  {path :'user-profile' ,component :UserProfileComponent},
  {path :'home' ,component :HomeComponent,canActivate:[]},
  {path :'transfer' ,component :TransactionsComponent,canActivate:[]},
  {path :'bank-account' ,component :BankAccountComponent,canActivate:[]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
