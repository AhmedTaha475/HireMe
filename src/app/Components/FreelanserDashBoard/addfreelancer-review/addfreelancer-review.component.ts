import { Component, OnInit } from '@angular/core';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { ProjectPostApplicantsService } from 'src/app/Services/project-post-applicants.service';
import { ProjectReviewService } from 'src/app/Services/project-review.service';

@Component({
  selector: 'app-addfreelancer-review',
  templateUrl: './addfreelancer-review.component.html',
  styleUrls: ['./addfreelancer-review.component.css'],
})
export class AddfreelancerReviewComponent implements OnInit {
  currentfreelancer: any;
  approvedapplicationList: any[] = [];
  allReviews: any[] = [];
  needToBeFilledReviews: any[] = [];
  constructor(
    private freelancerServ: FreelancerService,
    private projectpostapplicantServ: ProjectPostApplicantsService,
    private reviewServ: ProjectReviewService
  ) {}
  ngOnInit(): void {
    this.getcurrentfreelancer();
  }

  private getcurrentfreelancer() {
    this.freelancerServ.GetCurrentFreelancer().subscribe({
      next: (data: any) => {
        console.log(data);
        this.currentfreelancer = data.body;
        this.getallApplications();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  private getallApplications() {
    this.projectpostapplicantServ
      .GetAllByProjectPostApplicantsBy(this.currentfreelancer.id)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.approvedapplicationList = data.filter((el: any) => {
            return el.approved == true;
          });
          console.log(this.approvedapplicationList);
          this.approvedapplicationList.forEach((element: any) => {
            this.getreviewByProjectPostId(element.pP_ID);
          });
          console.log(this.needToBeFilledReviews);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  private getreviewByProjectPostId(id: number) {
    this.reviewServ.GetReviewByProjectID(id).subscribe({
      next: (data: any) => {
        this.needToBeFilledReviews.push(data);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
