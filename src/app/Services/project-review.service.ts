import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StaticURl } from '../Models/static-url';
import {AddClientReview} from '../Models/ProjectReview/add-client-review'
import {AddFreeLancerReview} from '../Models/ProjectReview/add-freelancer-review'

@Injectable({
  providedIn: 'root'
})
export class ProjectReviewService {
  Token:string = " ";
   headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.Token}`
  };
   options = {headers : this.headers };
  Url: any = StaticURl.URL+'ProjectReviews/';
  constructor(public client: HttpClient) { }

  AddClientReview(review:AddClientReview){
   return this.client.post(this.Url+'AddClientReview',review,this.options);
  }
  AddFreeLancerReview(review:AddFreeLancerReview){
    return this.client.post(this.Url+'AddFreelancerReview',review,this.options);
  }
  GetReviewByProjectID(P_Id:number){
    return this.client.get(this.Url+'ProjectReview/'+P_Id,this.options);
  }
  GetAllClientReviews(clientId:number){
    return this.client.get(this.Url+'ClientReviews/'+clientId,this.options);
  }
  GetAllFreelancerReviews(FreelancerId:number){
    return this.client.get(this.Url+'FreelancerReviews/'+FreelancerId,this.options);
  }
}
