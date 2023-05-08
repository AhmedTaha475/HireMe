import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { StaticHelper } from 'src/app/Helpers/static-helper';
import { GetClient } from 'src/app/Models/Client/get-client';
import { Portfolio } from 'src/app/Models/Portfolio/Portfolio';
import { CreateProject } from 'src/app/Models/Project/create-project';
import { GetProjectById } from 'src/app/Models/Project/get-project-by-id';
import { PortfolioService } from 'src/app/Services/Portfolio_Service/portfolio.service';
import { ClientService } from 'src/app/Services/client.service';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { ProjectImageService } from 'src/app/Services/project-image.service';
import { ProjectPostService } from 'src/app/Services/project-post.service';
import { ProjectService } from 'src/app/Services/project.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-freelancer-projects',
  templateUrl: './freelancer-projects.component.html',
  styleUrls: ['./freelancer-projects.component.css'],
})
export class FreelancerProjectsComponent implements OnInit {
  id: any;
  myFreelancer: any;
  ports: Portfolio[] = [];
  images: any[] = [];
  myPort: any;
  myProjects: GetProjectById[] = [];
  // projects:any
  opened: boolean = false;
  sysProj: any = false;
  addnewproject = new FormGroup({
    projectTitle: new FormControl('', [Validators.required]),
    projectDate: new FormControl(null, [Validators.required]),
    projectDescription: new FormControl('', [Validators.required]),
    moneyEarned: new FormControl('', []),
  });

  constructor(
    public myActiveRoute: ActivatedRoute,
    public freelancer: FreelancerService,
    public translate: TranslateService,
    public port: PortfolioService,
    public projects: ProjectService,
    public clientServ: ClientService,
    public imageServ: ProjectImageService // public myrouter: Route
  ) {
    this.id = myActiveRoute.snapshot.params['Id'];
    translate.setDefaultLang('en');
    translate.use('en');
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit(): void {
    this.port.GetAllPortfolio().subscribe({
      next: (data: any) => {
        data.forEach((element: any) => {
          // console.log(element);
          this.ports.push(new Portfolio(element.portId, element.freelancerId));
        });
      },
    });

    // console.log(this.ports);

    this.freelancer.GetCurrentFreelancer().subscribe({
      next: (data: any) => {
        this.myFreelancer = data.body;
        this.myPort = this.ports.filter(
          (p) => p.freelancerId == this.myFreelancer.id
        )[0];

        console.log(this.myPort);

        this.projects.GetProjectsByPortfolioId(this.myPort.portId).subscribe({
          next: (mydata: any) => {
            mydata.forEach((element: any) => {
              this.myProjects.push(
                new GetProjectById(
                  element.p_Id,
                  element.title,
                  element.description,
                  new Date(element.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }),
                  element.systemProject,
                  element.moneyEarned
                )
              );
              // console.log('***************************');
              // console.log(mydata);
            });
            // this.myProjects.forEach((element) => {
            //   console.log(element.P_Id);
            //   console.log(element.Date);
            //   console.log(element.Description);
            //   console.log(element.MoneyEarned);
            //   console.log(element.Title);
            // });
            console.log(this.myProjects);
            console.log('***********************');
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // to open form of adding new project ..
  open() {
    if (this.opened == false) {
      this.opened = true;
    } else this.opened = false;
  }

  // to update attachment like images ...
  GetImages(event: any) {
    this.images = event.target.files;
  }

  addNewProject() {
    const dateValue =
      this.addnewproject.get('projectDate')?.value ?? new Date();
    console.log(dateValue);
    //const date: Date = dateValue ? new Date(dateValue) : new Date();

    let newproject = new CreateProject(
      this.addnewproject.get('projectTitle')?.value || '',
      this.addnewproject.get('projectDescription')?.value || '',
      dateValue,
      false,
      '',
      this.myPort.portId,
      Number(this.addnewproject.get('moneyEarned')?.value || 0),
      this.images
    );
    console.log(newproject.ProjectImgs);
    var arrayOfImages: any[] = [];
    arrayOfImages.push(...this.images);
    var formData = new FormData();
    formData.append('title', newproject.title);
    formData.append('description', newproject.description);
    formData.append('MoneyEarned', newproject.MoneyEarned.toString() || '1000');
    formData.append('date', newproject.Date.toString());
    formData.append('systemProject', false.toString());
    formData.append('clientId', '');
    formData.append('portfolioId', newproject.PortfolioId.toString());
    // formData.append('projectImgs', this.images);
    arrayOfImages.forEach((el: any) => formData.append('projectImgs', el));
    this.projects.CreateProject(formData).subscribe({
      next: (data: any) => {
        window.location.reload();
        console.log(data);
      },
      error: (err: any) => console.log(err),
    });
  }
}
