import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StaticURl } from '../Models/static-url';
import { CreateProjectImage } from '../Models/ProjectImage/create';
import { UpdateProjectImage } from '../Models/ProjectImage/update';
@Injectable({
  providedIn: 'root',
})
export class ProjectImageService {
  headers = {
    'Content-Type': 'multipart/form-data',
  };
  options = { headers: this.headers };

  Url: any = StaticURl.URL + 'ProjectImage/';
  constructor(public client: HttpClient) {}
  GetAllImagesByProjectId(P_Id: number) {
    return this.client.get(this.Url + 'GetAllImagesByProjectId/' + P_Id);
  }
  GetProjectImageByid(Img_Id: number) {
    return this.client.get(this.Url + 'GetById/' + Img_Id);
  }
  CreateProjectImage(Img: CreateProjectImage) {
    return this.client.post(this.Url + 'AddImage', Img, this.options);
  }
  DeleteProjectImageByid(Img_Id: number) {
    return this.client.delete(this.Url + 'DeleteImage/' + Img_Id);
  }
  UpdateProjectImage(NewImg: UpdateProjectImage) {
    return this.client.put(this.Url + 'UpdateImage', NewImg, this.options);
  }
}
