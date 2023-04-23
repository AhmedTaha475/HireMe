import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StaticURl } from '../Models/static-url';
import { UpdateClientMoney } from '../Models/Client/update-client-money';
@Injectable({
  providedIn: 'root',
})
export class ClientService {
  Url: any = StaticURl.URL;
  Token: string = localStorage.getItem('Token') ?? '';
  headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.Token}`,
  };
  options = { headers: this.headers };

  headersf = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${this.Token}`,
  };
  constructor(private _httpClient: HttpClient) {}

  public GetAllClients() {
    return this._httpClient.get(this.Url + 'Users/GetAllClients', {
      headers: this.headers,
    });
  }
  public GetClientById(ClientId: string) {
    return this._httpClient.get(this.Url + `Users/GetClientById/${ClientId}`, {
      headers: this.headers,
    });
  }

  public GetCurrentClient() {
    return this._httpClient.get(this.Url + `Users/GetCurrentClient`, {
      headers: this.headers,
    });
  }

  public UpdateClient(data: FormData) {
    return this._httpClient.put(this.Url + 'Users/UpdateClient', data, {
      headers: this.headersf,
    });
  }

  public UpdateClientMoney(UpdateMoney: UpdateClientMoney) {
    return this._httpClient.put(
      this.Url + 'Users/UpdateClientMoney',
      UpdateMoney,
      { headers: this.headers }
    );
  }

  public DeleteCurrentClient() {
    return this._httpClient.delete(this.Url + 'Users/DeleteCurrentClient', {
      headers: this.headers,
    });
  }

  public DeleteClientById(clientId: string) {
    return this._httpClient.delete(
      this.Url + `Users/DeleteClient/${clientId}`,
      { headers: this.headers }
    );
  }
}
