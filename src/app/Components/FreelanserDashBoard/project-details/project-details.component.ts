import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { StaticHelper } from 'src/app/Helpers/static-helper';
import { GetClient } from 'src/app/Models/Client/get-client';
import { Portfolio } from 'src/app/Models/Portfolio/Portfolio';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  id: any;
  project: any;
  outdate: any;
  images: any;
  image: any;
  Jobimage: any;

  constructor(
    public projectservice: ProjectService,
    public myactivate: ActivatedRoute,
    public translate: TranslateService
  ) {
    const langItem = localStorage.getItem('Lang');
    if (langItem != null) {
      translate.use(langItem);
    }

    this.id = myactivate.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.projectservice.GetProjectWithImage(this.id).subscribe({
      next: (data) => {
        this.project = data;
        this.images = this.project.images;
        this.Jobimage = this.images[0].image;
        this.images.forEach((element: any) => {
          console.log(element);
        });
        // this.image = this.images[0].image;
        // console.log(this.images);

        // var dateee = this.project.date;

        // var outputDate = dateee.toISOString().slice(0, 10);
        // this.outdate = outputDate;
        // console.log(this.outdate);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
