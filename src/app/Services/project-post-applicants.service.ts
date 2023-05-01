import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StaticURl } from '../Models/static-url';
import { CreatePPApplicant } from '../Models/ProjecetPostApplicant/create-ppapplicant';
@Injectable({
  providedIn: 'root',
})
export class ProjectPostApplicantsService {
  Url: any = StaticURl.URL + 'ProjectPostApplicants/';
  constructor(public client: HttpClient) {}
  CreateProjectPostApplicant(applicant: CreatePPApplicant) {
    return this.client.post(
      this.Url + 'ProjectPostApplicant/Create',
      applicant
    );
  }

  UpdateProjectPostApplicant(
    applicant: CreatePPApplicant,
    ProjectPostId: number
  ) {
    return this.client.put(this.Url + `Update/${ProjectPostId}`, applicant);
  }

  GetAllByProjectPostById(ProjectPostId: number) {
    return this.client.get(this.Url + `GetAllByProjectPostId/${ProjectPostId}`);
  }
  GetAllByProjectPostApplicantsBy(ApplicantId: string) {
    return this.client.get(this.Url + `GetByProjectPostAppId/${ApplicantId}`);
  }

  GetAll() {
    return this.client.get(this.Url + 'GetAll');
  }
}
