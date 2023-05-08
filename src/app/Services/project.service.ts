import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StaticURl } from '../Models/static-url';
import { CreateProject } from '../Models/Project/create-project';
// import { GetProjectById } from '../Models/Project/get-project-by-id';
import { UpdateProject } from '../Models/Project/update-project-by-id';
// import { url } from 'inspector';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  headers = {
    'Content-Type': 'multipart/form-data',
  };
  options = { headers: this.headers };

  Url: any = StaticURl.URL + 'Projects/';
  constructor(public client: HttpClient) {}

  CreateProject(Project: any) {
    return this.client.post(this.Url, Project);
  }
  GetProjectById(P_Id: number) {
    return this.client.get(this.Url + 'Project/' + P_Id);
  }
  GetProjectsByPortfolioId(portfolio_id: number) {
    return this.client.get(this.Url + 'ProjectByPortfolioId/' + portfolio_id);
  }
  UpdateProject(P_Id: number, NewProject: UpdateProject) {
    return this.client.put(this.Url + 'UpdateProjectById/' + P_Id, NewProject);
  }
  DeleteProject(P_Id: number) {
    return this.client.delete(this.Url + 'Delete/' + P_Id);
  }
  GetAll() {
    return this.client.get(this.Url + 'GetAll');
  }

  GetProjectWithImage(P_Id: number) {
    return this.client.get(this.Url + 'GetProjectWithImage/' + P_Id);
  }
}
