import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserLoginServiceService {
  Url:any="https://localhost:7047/api/Users/Login";
  constructor(public client:HttpClient) { }
  LoginUser(User:any)
  {
    return this.client.post(this.Url,User)
  }


}
