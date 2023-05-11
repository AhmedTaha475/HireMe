import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/Services/client.service';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { ProjectReviewService } from 'src/app/Services/project-review.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-client-main-reviews',
  templateUrl: './client-main-reviews.component.html',
  styleUrls: ['./client-main-reviews.component.css'],
})
export class ClientMainReviewsComponent implements OnInit {
  ReviewsObject: any[] = [];
  MyCustomData: number = 5;
  reviewList: any[] = [];
  freelancerData: any;
  currentClientId: any;
  constructor(
    private freelancerServ: FreelancerService,
    private reviewServ: ProjectReviewService,
    private clientServ: ClientService,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    const langItem = localStorage.getItem('Lang');
    if (langItem !== null) {
      translate.use(langItem);
    }
  }
  ngOnInit(): void {
    this.getcurrentclient();
  }
  private getcurrentclient() {
    this.clientServ.GetCurrentClient().subscribe({
      next: (data: any) => {
        console.log(data);
        this.currentClientId = data.body.id;
        this.getallreviews();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  private getallreviews() {
    this.reviewServ.GetAllClientReviews(this.currentClientId).subscribe({
      next: (data: any) => {
        this.reviewList = data;
        console.log(data);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  private getFreelancerDataWithReviews() {
    this.ReviewsObject = this.reviewList.map((el: any) => {});
  }
}
