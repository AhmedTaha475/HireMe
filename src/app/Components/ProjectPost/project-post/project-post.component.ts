import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectPostWithApplicants } from 'src/app/Models/ProjectPost/get-projectpost-with-applicants';
import { ProjectPostService } from 'src/app/Services/project-post.service';

@Component({
  selector: 'app-project-post',
  templateUrl: './project-post.component.html',
  styleUrls: ['./project-post.component.css']
})
export class ProjectPostComponent implements OnInit {
  projectPostId:any;
  freelancer:any;
  projectPost:any;
  projectPost2:any
  constructor(myActivated:ActivatedRoute,private projectPostService:ProjectPostService){
    this.projectPostId = myActivated.snapshot.params["id"];
    console.log(myActivated);
  }
  ngOnInit(): void {
    this.projectPostService.GetProjectPostWithApplicants(this.projectPostId).subscribe({
      next:(data)=>{
        this.projectPost2 = data;
        console.log(this.projectPost2.postTitle);
          this.projectPost = new ProjectPostWithApplicants(
          this.projectPost2.postTitle,
          this.projectPost2.description,
          this.projectPost2.averagePrice,
          this.projectPost2.categoryId,
          this.projectPost2.projectPostApplicants
      );
      console.log(this.projectPost2);
      },
      error:(err)=>{console.log(err)}
    })
  }
}
