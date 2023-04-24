import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StaticURl } from '../../Models/static-url';
@Injectable({
  providedIn: 'root',
})
export class MyServiseService {
  Url: any = StaticURl.URL;
  constructor(public client: HttpClient) {}

  CreateFreelancer(User: any) {
    return this.client.post(this.Url + 'Users/RegisterFreelancer', User);
  }
  CreateClient(User: any) {
    return this.client.post(this.Url + 'Users/RegisterClient', User);
  }
}
