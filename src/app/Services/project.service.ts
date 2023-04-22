import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StaticURl } from '../Models/static-url';
import { CreateProject } from '../Models/Project/create-project';
// import { GetProjectById } from '../Models/Project/get-project-by-id';
import { UpdateProject } from '../Models/Project/update-project-by-id';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
   Token:string = " ";
  headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.Token}`
  };
   options = {headers : this.headers };

   headersf = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${this.Token}`
  };

  Url: any = StaticURl.URL+'Projects/';
  constructor(public client: HttpClient) { }

  CreateProject(Project: CreateProject) {
    return this.client.post(this.Url , Project ,{headers: this.headersf});
  }
  GetProjectById(P_Id: number) {
    return this.client.get(this.Url + 'Project/' + P_Id,this.options);
  }
  GetProjectsByPortfolioId(portfolio_id: number) {
    return this.client.get(this.Url + 'ProjectByPortfolioId/' + portfolio_id,this.options);
  }
  UpdateProject(P_Id:number,NewProject:UpdateProject){
    return this.client.put(this.Url + 'UpdateProjectById/'+P_Id,NewProject,this.options);
  }
  DeleteProject(P_Id:number){
    return this.client.delete(this.Url+'Delete/'+P_Id,this.options);
  }
}
