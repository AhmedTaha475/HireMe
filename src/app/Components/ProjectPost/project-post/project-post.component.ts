import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectPostWithApplicants } from 'src/app/Models/ProjectPost/get-projectpost-with-applicants';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { ProjectPostService } from 'src/app/Services/project-post.service';

@Component({
  selector: 'app-project-post',
  templateUrl: './project-post.component.html',
  styleUrls: ['./project-post.component.css']
})
export class ProjectPostComponent implements OnInit {
  projectPostId:any;
  freelancerArr:any[] = [];
  projectPost:any;
  projectPost2:any;
  applicant:any;
  applicantAllData:any;
  constructor(
    private myActivated:ActivatedRoute,
    private projectPostService:ProjectPostService,
    private freelancerService: FreelancerService
    ){
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
          
          this.projectPost.projectPostApplicants.forEach((applicant:any) => {
            this.freelancerService.GetFreelancerById(applicant.freelancerId).subscribe({
              next:(data:any)=>{
                
                this.applicantAllData = {
                  data: data.body,
                  applicant,
                }
                  this.freelancerArr.push(this.applicantAllData);
                  console.log(this.freelancerArr);
                },
                error:(err)=>{console.log(err)}})
          });
        },
        error:(err)=>{console.log(err)}
      });
      console.log(this.freelancerArr)
  }
}
