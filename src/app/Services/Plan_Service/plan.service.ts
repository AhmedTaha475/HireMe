// to use all methods of http requset in our service :
import { HttpClient } from '@angular/common/http';

// to get Base url : https://localhost:7047/api/ ---> we use StaticURL Class :
import { StaticURl } from 'src/app/Models/static-url';

// to use an oject of lookup table to use it in our html and anguler :
import { UpdatePlan } from 'src/app/Models/Plan/Update-Plan';
import { CreatePlan } from 'src/app/Models/Plan/Create-Plan';

import { Token } from '@angular/compiler';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  //#region  Some Helpers Variables :

  Url: any = StaticURl.URL + 'Plan/';

  //#endregion
  constructor(public myclient: HttpClient) {}

  //#region All Cruds of Plan :

  // Get All Plans :
  GetAllPlans() {
    return this.myclient.get(this.Url);
  }

  // Get Plan By its Id :
  GetPlanById(PlanId: Number) {
    return this.myclient.get(this.Url + PlanId);
  }

  // Create Plan :
  CreatePlan(newPlan: CreatePlan) {
    return this.myclient.post(this.Url, newPlan);
  }

  // Update Plan by its id  :
  UpdatePlanById(PlanId: number, updatedPlan: UpdatePlan) {
    return this.myclient.put(this.Url + PlanId, updatedPlan);
  }

  // Delete Plan By its Id :
  DeletePlan(PlanId: Number) {
    return this.myclient.delete(this.Url + PlanId);
  }

  //#endregion
}
