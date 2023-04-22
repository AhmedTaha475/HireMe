import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StaticURl } from '../Models/static-url';
import { CreateProjectImage } from '../Models/ProjectImage/create';
import { UpdateProjectImage } from '../Models/ProjectImage/update';
@Injectable({
  providedIn: 'root',
})
export class ProjectImageService {
  Token: string = ' ';
  headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.Token}`,
  };
  options = { headers: this.headers };

  headersf = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${this.Token}`,
  };

  Url: any = StaticURl.URL + 'ProjectImage/';
  constructor(public client: HttpClient) {}
  GetAllImagesByProjectId(P_Id: number) {
    this.client.get(this.Url + 'GetAllImagesByProjectId/' + P_Id, this.options);
  }
  GetProjectImageByid(Img_Id: number) {
    this.client.get(this.Url + 'GetById/' + Img_Id, this.options);
  }
  CreateProjectImage(Img: CreateProjectImage) {
    this.client.post(this.Url + 'AddImage', Img, { headers: this.headersf });
  }
  DeleteProjectImageByid(Img_Id: number) {
    this.client.delete(this.Url + 'DeleteImage/' + Img_Id, this.options);
  }
  UpdateProjectImage(NewImg: UpdateProjectImage) {
    this.client.put(this.Url + 'UpdateImage', NewImg, {
      headers: this.headersf,
    });
  }
}
