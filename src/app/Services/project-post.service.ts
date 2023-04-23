import { Injectable } from '@angular/core';
import { StaticURl } from '../Models/static-url';
import { HttpClient } from '@angular/common/http';
import { UpdateProjectPost } from '../Models/ProjectPost/update-projectpost';
import { CreateProjectPost } from '../Models/ProjectPost/create-projectpost';

@Injectable({
  providedIn: 'root'
})
export class ProjectPostService {
  Token:string=localStorage.getItem("Token")??"";
  headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.Token}`
  };
   options = {headers : this.headers };

   headersf = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${this.Token}`
  };

  Url: any = StaticURl.URL+'ProjectPosts/';
  constructor(public client: HttpClient) { }
  CreateProjectPost(ProjectPost: CreateProjectPost){
    return this.client.post(this.Url + 'Create/', ProjectPost,{headers: this.headersf});
  }
  UpdateProjectPost(ProjectPostId:number,NewProject:UpdateProjectPost){
    return this.client.put(this.Url + 'Update/'+ ProjectPostId,NewProject,this.options);
  }
  DeleteProjectPost(ProjectPostId:number){
    return this.client.delete(this.Url + 'Delete/'+ ProjectPostId,this.options);
  }
  GetProjectPostWithApplicants(ProjectPostId: number) {
    return this.client.get(this.Url + 'ProjectPostWithApplicants/' + ProjectPostId);
  }
  GetAllProjectPosts() {
    return this.client.get(this.Url + 'GetAll/',this.options);
  }
}
