import { Injectable } from '@angular/core';
import { StaticURl } from '../Models/static-url';
import { HttpClient } from '@angular/common/http';
import { CreateOffer } from '../Models/Offer/create-offer';
import { UpdateOffer } from '../Models/Offer/update-offer';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  URL: string = StaticURl.URL + 'Offer/';
  constructor(private _httpClient: HttpClient) {}

  GetAll() {
    return this._httpClient.get(this.URL + 'GetAll');
  }
  GetAllByFreelancerId(id: string) {
    return this._httpClient.get(this.URL + `GetAllByFreelancerId/${id}`);
  }
  GetAllByClientId(id: string) {
    return this._httpClient.get(this.URL + `GetAllByClientId/${id}`);
  }
  GetOfferById(id: number) {
    return this._httpClient.get(this.URL + `GetOfferById/${id}`);
  }
  CreateOffer(offer: CreateOffer) {
    return this._httpClient.post(this.URL + 'CreateOffer', offer);
  }
  UpdateOffer(offer: UpdateOffer) {
    return this._httpClient.put(this.URL + 'UpdateOffer', offer);
  }
  DeleteOffer(id: number) {
    return this._httpClient.delete(this.URL + `DeleteOffer/${id}`);
  }
}
