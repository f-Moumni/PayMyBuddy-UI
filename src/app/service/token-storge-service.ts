import { Injectable } from '@angular/core';
import {User} from "../model/app-user.model";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string, rememberMe: boolean): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
    if(rememberMe===false){
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }else {
      window.localStorage.setItem(TOKEN_KEY, token);
    }

  }

  public getToken(): string {
    // @ts-ignore
    return (sessionStorage.getItem(TOKEN_KEY)===null)?localStorage.getItem(TOKEN_KEY):sessionStorage.getItem(TOKEN_KEY);
  }
  public removeToken(): void {
    return sessionStorage.removeItem(TOKEN_KEY)
  }

  public saveUser(mail:string): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, mail);
  }

  public getUser(): any {
    return sessionStorage.getItem(USER_KEY);
  }

}
