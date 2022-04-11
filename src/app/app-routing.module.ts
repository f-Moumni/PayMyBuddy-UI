import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./component/login/login.component";
import {RegistrationComponent} from "./component/registration/registration.component";
import {UserProfileComponent} from "./component/user-profile/user-profile.component";
import {HomeComponent} from "./component/home/home.component";
import {NewContactComponent} from "./component/new-contact/new-contact.component";
import {ContactsComponent} from "./component/contacts/contacts.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo:'login' ,pathMatch: 'full' },
  {path: 'register', component: RegistrationComponent},
  {path: 'contacts', component: ContactsComponent},
  {path :'user-profile/:email' ,component :UserProfileComponent,canActivate:[]},
  {path :'home/:email' ,component :HomeComponent,canActivate:[]}
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
