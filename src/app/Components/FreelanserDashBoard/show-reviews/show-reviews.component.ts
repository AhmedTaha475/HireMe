import { Component } from '@angular/core';
import { ClientService } from 'src/app/Services/client.service';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { ProjectPostService } from 'src/app/Services/project-post.service';
import { ProjectReviewService } from 'src/app/Services/project-review.service';

@Component({
  selector: 'app-show-reviews',
  templateUrl: './show-reviews.component.html',
  styleUrls: ['./show-reviews.component.css'],
})
export class ShowReviewsComponent {
  reviewList: any[] = [];
  currentfreelancerId: any;
  ProjectPostList: any[] = [];
  ReviewListObject: any[] = [];
  isLoaded: boolean = false;
  constructor(
    private freelancerServ: FreelancerService,
    private reviewServ: ProjectReviewService,
    private clientServ: ClientService,
    private projcetPostServ: ProjectPostService
  ) {}
  ngOnInit(): void {
    this.getCurrentFreelancer();
  }

  private getCurrentFreelancer() {
    this.freelancerServ.GetCurrentFreelancer().subscribe({
      next: (data: any) => {
        this.currentfreelancerId = data.body.id;
        console.log(data);
        this.getallreviews();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  private getallreviews() {
    this.reviewServ
      .GetAllFreelancerReviews(this.currentfreelancerId)
      .subscribe({
        next: (data: any) => {
          this.reviewList = data;
          this.GetAllProjectPosts();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
  private GetAllProjectPosts() {
    this.projcetPostServ.GetAllProjectPosts().subscribe({
      next: (data: any) => {
        this.ProjectPostList = data;
        this.GetReviewObject();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  private GetReviewObject() {
    this.ReviewListObject = this.reviewList.map((el: any) => {
      const projectPost = this.ProjectPostList.find(
        (element: any) => element.id == el.projectId
      );
      return {
        ...el,
        postTitle: projectPost.postTitle,
        date: projectPost.projectPostDate,
      };
    });
    console.log(this.ReviewListObject);
    this.isLoaded = true;
  }
}
