import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StaticHelper } from 'src/app/Helpers/static-helper';
import { GetClient } from 'src/app/Models/Client/get-client';
import { Portfolio } from 'src/app/Models/Portfolio/Portfolio';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent {}
