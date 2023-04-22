import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { StaticURl } from 'src/app/Models/static-url';

@Injectable({
  providedIn: 'root'
})

export class UserLoginServiceService {
  // Url:any="https://localhost:7047/api/Users/Login";
  URL=StaticURl.URL
  constructor(public client:HttpClient) { }
  LoginUser(User:any)
  {
    return this.client.post(this.URL+"Users/Login",User)
  }


}
