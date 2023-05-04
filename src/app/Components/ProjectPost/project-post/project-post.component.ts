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
  freelancer:any;
  freelancerId:any;
  applied:any
  constructor(
    private myActivated:ActivatedRoute,
    private projectPostService:ProjectPostService,
    private freelancerService: FreelancerService
    ){
    this.projectPostId = myActivated.snapshot.params["id"];
    console.log(myActivated);
  }
  ngOnInit(): void {
    //#region  Get Current Freelancer
      this.freelancerService.GetCurrentFreelancer().subscribe({
        next:(data:any)=>{
          this.freelancer = data.body;
          this.freelancerId = this.freelancer.id;
          console.log(this.freelancerId)
        },
        error:(err)=>{}
      })
    //#endregion
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
          //#region  application applying button
          for (let i =0; i<this.projectPost.projectPostApplicants.length;i++){
              if (this.projectPost.projectPostApplicants[i].freelancerId == this.freelancerId){
                this.applied = true;
                const applyBtn = document.getElementById('applyBtn');
                // Set the href attribute
                if (applyBtn) {
                  applyBtn.setAttribute('href', '/ProjectPost/'+this.projectPostId+'/ProjectPostApplicant/Update');
                  applyBtn.textContent = 'Update Application';
                }
                break;
              }
              else{
                console.log("not applied")
                const applyBtn = document.getElementById('applyBtn');
                // Set the href attribute
                if (applyBtn) {
                  applyBtn.setAttribute('href', '/ProjectPost/'+this.projectPostId+'/ProjectPostApplicant/Create');
                  applyBtn.textContent = 'Apply Now';
                }
              }
          }
          // this.projectPost.projectPostApplicants.forEach((applicant:any) => {
          //   console.log(applicant.freelancerId)
          //   console.log(this.freelancerId)

          //   if (applicant.freelancerId == this.freelancerId)
          //   {
          //     const applyBtn = document.getElementById('applyBtn');
          //     // Set the href attribute
          //     if (applyBtn) {
          //       applyBtn.setAttribute('href', '/ProjectPost/'+this.projectPostId+'/ProjectPostApplicant/Update');
          //       applyBtn.textContent = 'Update Application';
          //     }
          //     return;
          //   }
          //   else{
          //     const applyBtn = document.getElementById('applyBtn');
          //     // Set the href attribute
          //     if (applyBtn) {
          //       applyBtn.setAttribute('href', '/ProjectPost/'+this.projectPostId+'/ProjectPostApplicant/Create');
          //       applyBtn.textContent = 'Apply Now';
          //     }
          //   }
          // })
          //#endregion
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
