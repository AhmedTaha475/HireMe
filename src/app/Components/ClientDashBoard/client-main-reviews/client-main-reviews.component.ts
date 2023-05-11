import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/Services/client.service';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { ProjectPostService } from 'src/app/Services/project-post.service';
import { ProjectReviewService } from 'src/app/Services/project-review.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-client-main-reviews',
  templateUrl: './client-main-reviews.component.html',
  styleUrls: ['./client-main-reviews.component.css'],
})
export class ClientMainReviewsComponent implements OnInit {
  reviewList: any[] = [];
  currentClientId: any;
  ProjectPostList: any[] = [];
  ReviewListObject: any[] = [];
  isLoaded: boolean = false;
  constructor(
    private freelancerServ: FreelancerService,
    private reviewServ: ProjectReviewService,
    private clientServ: ClientService,
    public translate: TranslateService,
    private projcetPostServ: ProjectPostService
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
        console.log(data);
        this.reviewList = data.filter((el: any) => {
          return el.freeLancer.id != null;
        });
        console.log(this.reviewList);
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
        console.log(data);
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
    this.isLoaded = true;
  }
}
