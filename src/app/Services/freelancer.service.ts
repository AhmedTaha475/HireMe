import { Injectable } from '@angular/core';
import { StaticURl } from '../Models/static-url';
import { HttpClient } from '@angular/common/http';
import { UpdateFreelancertMoney } from '../Models/Freelancer/update-freelancert-money';

@Injectable({
  providedIn: 'root'
})
export class FreelancerService {
  constructor(private _httpClient: HttpClient) {}

  Url: any = StaticURl.URL;
  Token: string = localStorage.getItem('Token') ?? '';
  headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.Token}`,
  };
  // options = { headers: this.headers };

  headersf = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${this.Token}`,
  };

  public GetAllFreelancers() {
    return this._httpClient.get(this.Url + 'Users/GetAllFreelancer', {headers: this.headers,});
  }
  public GetFreelancerById(FreelancerId: string) {
    return this._httpClient.get(this.Url + `Users/GetFreelancerById/${FreelancerId}`,{headers: this.headers,});
  }

  public GetCurrentFreelancer() {
    return this._httpClient.get(this.Url + `Users/GetCurrentFreelancer`, {headers: this.headers,});
  }

  public UpdateFreelancer(data: FormData) {
    return this._httpClient.put(this.Url + 'Users/UpdateFreelancer', data, {headers: this.headersf,});
  }

  public UpdateClientMoney(UpdateMoney: UpdateFreelancertMoney) {
    return this._httpClient.put(this.Url + 'Users/UpdateFreelancerMoney',UpdateMoney,{ headers: this.headers });
  }

  public DeleteCurrentFreelancer() {
    return this._httpClient.delete(this.Url + 'Users/DeleteCurrentFreelancer', {headers: this.headers,});
  }

  public DeleteFreelancerById(clientId: string) {
    return this._httpClient.delete(this.Url + `Users/DeleteFreelancer/${clientId}`,{ headers: this.headers });
  }
}
