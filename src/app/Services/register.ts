import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StaticURl } from '../Models/static-url';
@Injectable({
  providedIn: 'root',
})
export class MyServiseService {
  // Url: any = 'https://localhost:7047/api/Users/RegisterClient';
  Url: any = StaticURl.URL;
  constructor(public client: HttpClient) {}
  // GetAllUsers()
  // {
  //   return this.client.get(this.Url)
  // }
  // UserDetails(id:Number)
  // {
  //     return this.client.get(this.Url+'/'+id)
  // }
  // UpdateUser(id:number,User:any)
  // {
  //   return this.client.put(this.Url+'/'+id,User)
  // }
  CreateUser(User: any) {
    return this.client.post(this.Url + 'Users/RegisterClient', User);
  }
  // DeleteUser(id:any)
  // {
  //   return this.client.delete(this.Url+'/'+id)
  // }
}
