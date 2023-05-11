import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddClientReview } from 'src/app/Models/ProjectReview/add-client-review';
import { ClientService } from 'src/app/Services/client.service';
import { ProjectPostService } from 'src/app/Services/project-post.service';
import { ProjectReviewService } from 'src/app/Services/project-review.service';

@Component({
  selector: 'app-add-client-review',
  templateUrl: './add-client-review.component.html',
  styleUrls: ['./add-client-review.component.css'],
})
export class AddClientReviewComponent implements OnInit {
  projectPostId: any;
  clientId: any;
  currentProjectPost: any;
  addClientReview = new FormGroup({
    review: new FormControl('', [Validators.required, Validators.minLength(5)]),
    stars: new FormControl('', [
      Validators.required,
      Validators.max(5),
      Validators.min(0),
    ]),
  });
  constructor(
    private myRoute: ActivatedRoute,
    private myRouter: Router,
    private reviewService: ProjectReviewService,
    private clientService: ClientService,
    private projectpostServ: ProjectPostService
  ) {
    this.projectPostId = this.myRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.clientService.GetCurrentClient().subscribe({
      next: (data: any) => {
        this.clientId = data.body.id;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  confirmAdd() {
    let clientReviewData = new AddClientReview(
      this.clientId,
      this.projectPostId,
      this.addClientReview.get('review')?.value || '',
      Number(this.addClientReview.get('stars')?.value) || 0
    );
    console.log(clientReviewData);
    this.reviewService.AddClientReview(clientReviewData).subscribe({
      next: (data) => {
        this.EndProject(this.projectPostId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  EndProject(id: number) {
    this.projectpostServ.GetProjectPostById(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.currentProjectPost = data;
        this.currentProjectPost.done = true;
        this.projectpostServ
          .UpdateProjectPost(id, this.currentProjectPost)
          .subscribe({
            next: (data: any) => {
              this.myRouter.navigateByUrl(`/client/managejob`);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
