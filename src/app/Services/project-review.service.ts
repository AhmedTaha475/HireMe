import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StaticURl } from '../Models/static-url';
import { AddClientReview } from '../Models/ProjectReview/add-client-review';
import { AddFreeLancerReview } from '../Models/ProjectReview/add-freelancer-review';

@Injectable({
  providedIn: 'root',
})
export class ProjectReviewService {
  Url: any = StaticURl.URL + 'ProjectReviews/';
  constructor(public client: HttpClient) {}

  AddClientReview(review: AddClientReview) {
    return this.client.post(this.Url + 'AddClientReview', review);
  }
  AddFreeLancerReview(review: AddFreeLancerReview) {
    return this.client.put(this.Url + 'AddFreelancerReview', review);
  }
  GetReviewByProjectID(P_Id: number) {
    return this.client.get(this.Url + 'ProjectReview/' + P_Id);
  }
  GetAllClientReviews(clientId: number) {
    return this.client.get(this.Url + 'ClientReviews/' + clientId);
  }
  GetAllFreelancerReviews(FreelancerId: number) {
    return this.client.get(this.Url + 'FreelancerReviews/' + FreelancerId);
  }
}
