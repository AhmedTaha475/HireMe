import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { FreelancerService } from 'src/app/Services/freelancer.service';

@Component({
  selector: 'app-freelancer-home',
  templateUrl: './freelancer-home.component.html',
  styleUrls: ['./freelancer-home.component.css'],
})
export class FreelancerHomeComponent implements OnInit {
  currentfreelancer: any;
  // freelancerid: any;
  constructor(
    private myfreelanceservice: FreelancerService,
    myactivatelink: ActivatedRoute , public translate:TranslateService
  ) {
    const langItem = localStorage.getItem('Lang');
    if (langItem != null) {
      translate.use(langItem);
    }
  }
  ngOnInit(): void {
    this.myfreelanceservice.GetCurrentFreelancer().subscribe({
      next: (data: any) => {
        this.currentfreelancer = data.body;
        console.log(this.currentfreelancer);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
