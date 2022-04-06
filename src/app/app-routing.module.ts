import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./component/login/login.component";
import {RegistrationComponent} from "./component/registration/registration.component";
import {UserProfileComponent} from "./component/user-profile/user-profile.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo:'login' ,pathMatch: 'full' },
  {path: 'register', component: RegistrationComponent},
  {path :'user-profile/:email' ,component :UserProfileComponent,canActivate:[]}
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
