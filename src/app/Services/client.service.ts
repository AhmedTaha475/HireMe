import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StaticURl } from '../Models/static-url';
import { UpdateClientMoney } from '../Models/Client/update-client-money';
@Injectable({
  providedIn: 'root',
})
export class ClientService {
  Url: any = StaticURl.URL;
  // Token: string = localStorage.getItem('Token') ?? '';
  // headers = {
  //   'Content-Type': 'application/json',
  //   Authorization: `Bearer ${this.Token}`,
  // };

  headers = {
    'Content-Type': 'multipart/form-data',
  };
  options = { headers: this.headers };
  constructor(private _httpClient: HttpClient) {}

  public GetAllClients() {
    return this._httpClient.get(this.Url + 'Users/GetAllClients');
  }
  public GetClientById(ClientId: string) {
    return this._httpClient.get(this.Url + `Users/GetClientById/${ClientId}`);
  }

  public GetCurrentClient() {
    return this._httpClient.get(this.Url + `Users/GetCurrentClient`);
  }

  public UpdateClient(data: FormData) {
    return this._httpClient.put(
      this.Url + 'Users/UpdateClient',
      data,
      this.options
    );
  }

  public UpdateClientMoney(UpdateMoney: UpdateClientMoney) {
    return this._httpClient.put(
      this.Url + 'Users/UpdateClientMoney',
      UpdateMoney
    );
  }

  public DeleteCurrentClient() {
    return this._httpClient.delete(this.Url + 'Users/DeleteCurrentClient');
  }

  public DeleteClientById(clientId: string) {
    return this._httpClient.delete(this.Url + `Users/DeleteClient/${clientId}`);
  }
}
