import { Injectable } from '@angular/core';
import { StaticURl } from '../Models/static-url';
import { HttpClient } from '@angular/common/http';
import { UpdateFreelancertMoney } from '../Models/Freelancer/update-freelancert-money';

@Injectable({
  providedIn: 'root',
})
export class FreelancerService {
  constructor(private _httpClient: HttpClient) {}

  Url: any = StaticURl.URL;

  headers = {
    'Content-Type': 'multipart/form-data',
  };
  options = { headers: this.headers };

  public GetAllFreelancers() {
    return this._httpClient.get(this.Url + 'Users/GetAllFreelancer');
  }
  public GetFreelancerById(FreelancerId: string) {
    return this._httpClient.get(
      this.Url + `Users/GetFreelancerById/${FreelancerId}`
    );
  }

  public GetCurrentFreelancer() {
    return this._httpClient.get(this.Url + `Users/GetCurrentFreelancer`);
  }

  public UpdateFreelancer(data: FormData) {
    return this._httpClient.put(this.Url + 'Users/UpdateFreelancer',data);
  }

  public UpdateClientMoney(UpdateMoney: UpdateFreelancertMoney) {
    return this._httpClient.put(this.Url + 'Users/UpdateFreelancerMoney',UpdateMoney);
  }

  public DeleteCurrentFreelancer() {
    return this._httpClient.delete(this.Url + 'Users/DeleteCurrentFreelancer');
  }

  public DeleteFreelancerById(clientId: string) {
    return this._httpClient.delete(this.Url + `Users/DeleteFreelancer/${clientId}`);
  }
}
