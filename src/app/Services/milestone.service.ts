import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StaticURl } from '../Models/static-url';
import { CreateMilestone } from '../Models/Milestone/create-milestone';
import { UpdateMilestone } from '../Models/Milestone/update-milestone';

@Injectable({
  providedIn: 'root',
})
export class MilestoneService {
  URL: string = StaticURl.URL + 'Milestones/';
  constructor(private _httpclient: HttpClient) {}

  CreateMilestone(milestone: CreateMilestone) {
    return this._httpclient.post(this.URL + 'Create', milestone);
  }
  UpdateMilestone(id: number, milestone: UpdateMilestone) {
    return this._httpclient.put(this.URL + `Update/${id}`, milestone);
  }
  DeleteMilestone(id: number) {
    return this._httpclient.delete(this.URL + `Delete/${id}`);
  }
  GetMilestoneById(id: number) {
    return this._httpclient.get(this.URL + `Milestone/${id}`);
  }
  GetMilestroneByProjectId(id: number) {
    return this._httpclient.get(this.URL + `ProjectMileStones/${id}`);
  }
}
