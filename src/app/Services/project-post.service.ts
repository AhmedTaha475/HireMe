import { Injectable } from '@angular/core';
import { StaticURl } from '../Models/static-url';
import { HttpClient } from '@angular/common/http';
import { UpdateProjectPost } from '../Models/ProjectPost/update-projectpost';
import { CreateProjectPost } from '../Models/ProjectPost/create-projectpost';

@Injectable({
  providedIn: 'root',
})
export class ProjectPostService {
  Url: any = StaticURl.URL + 'ProjectPosts/';
  constructor(public client: HttpClient) {}
  CreateProjectPost(ProjectPost: any) {
    return this.client.post(this.Url + 'Create/', ProjectPost);
  }
  CreateProjectPostForFreelancer(ProjectPost: any,id:string) {
    return this.client.post(this.Url + 'Create/' + id, ProjectPost);
  }
  UpdateProjectPost(ProjectPostId: number, UpdatedProject: any) {
    return this.client.put(
      this.Url + 'Update/' + ProjectPostId,
      UpdatedProject
    );
  }
  DeleteProjectPost(ProjectPostId: number) {
    return this.client.delete(this.Url + 'Delete/' + ProjectPostId);
  }
  GetProjectPostWithApplicants(ProjectPostId: number) {
    return this.client.get(
      this.Url + 'ProjectPostWithApplicants/' + ProjectPostId
    );
  }
  GetProjectPostById(ProjectPostId: number) {
    return this.client.get(this.Url + 'GetProjectPostById/' + ProjectPostId);
  }
  GetAllProjectPosts() {
    return this.client.get(this.Url + 'GetAll');
  }
  GetAllProjectsByClientID(id: string) {
    return this.client.get(this.Url + `GetAllByClientId/${id}`);
  }
  GetAllProjectPostsByCurrentClient() {
    return this.client.get(this.Url + 'GetAllByCurrentClient');
  }
}
