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
  public isAdmin() {
    if (localStorage.getItem('Roles')=="Admin") return true;
    return false;
  }
  public isClient() {
    if (localStorage.getItem('Roles')=="Client") return true;
    return false;
  }
  public isFreelancer() {
    if (localStorage.getItem('Roles')=="Freelancer") return true;
    return false;
  }
}
