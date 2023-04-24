import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public isLoggedIn() {
    if (localStorage.getItem('Token')) return true;
    return false;
  }

  public logout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('Roles');
  }

  public getToken() {
    return localStorage.getItem('Token');
  }

  public getRoles() {
    return localStorage.getItem('Roles');
  }
}
