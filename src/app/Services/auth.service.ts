import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _router: Router) {}

  public isLoggedIn() {
    if (localStorage.getItem('Token')) return true;
    return false;
  }

  public logout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('Roles');
    this._router.navigateByUrl('/Login');
  }

  public getToken() {
    return localStorage.getItem('Token');
  }

  public getRoles() {
    return localStorage.getItem('Roles');
  }
}
