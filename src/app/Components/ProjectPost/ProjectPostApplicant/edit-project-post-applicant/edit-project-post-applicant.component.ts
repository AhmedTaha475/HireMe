import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatePPApplicant } from 'src/app/Models/ProjecetPostApplicant/create-ppapplicant';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { ProjectPostApplicantsService } from 'src/app/Services/project-post-applicants.service';

@Component({
  selector: 'app-edit-project-post-applicant',
  templateUrl: './edit-project-post-applicant.component.html',
  styleUrls: ['./edit-project-post-applicant.component.css']
})
export class EditProjectPostApplicantComponent implements OnInit {
  projectPostId:any;
  freelancer:any
  freelancerId:any;
  applicants:any;
  applicant:any;
  updateApplicant = new FormGroup({
    biddingPrice: new FormControl('', [
      Validators.required,
    ]),
    proposal: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    
  })
  constructor(
    private myRoute:ActivatedRoute,
    private myRouter: Router,
    private applicantService:ProjectPostApplicantsService,
    private freelancerService: FreelancerService
    ){
    this.projectPostId = myRoute.snapshot.params["id"];
  }
  ngOnInit(): void {
    
    this.freelancerService.GetCurrentFreelancer().subscribe({
      next:(data:any)=>{
        this.freelancer = data.body;
        this.freelancerId = this.freelancer.id;
        this.applicantService.GetAllByProjectPostById(this.projectPostId).subscribe({
          next:(data)=>{
            this.applicants =data;
            console.log(this.applicants);
            console.log(this.freelancerId);
            this.applicants.forEach((app: any) => {
              if (app.freelancerId == this.freelancerId)
              {
                this.applicant = app;
                console.log(this.applicant);
                this.updateApplicant.get('biddingPrice')?.setValue(this.applicant.biddingPrice);
                this.updateApplicant.get('proposal')?.setValue(this.applicant.proposal); 
              }
            });
          },
          error:(err)=>{}
        })
      },
      error:(err)=>{}
    });
  }
  confirmUpdate(){
    let applicantData = new CreatePPApplicant(
      this.projectPostId,
      Number(this.updateApplicant.get('biddingPrice')?.value) || 0,
      this.updateApplicant.get('proposal')?.value || '',
      this.freelancerId
    );
    console.log(applicantData);
    this.applicantService.UpdateProjectPostApplicant(applicantData,this.projectPostId).subscribe({
      next:(data)=>{
        this.myRouter.navigateByUrl('/ProjectPost/'+this.projectPostId)
      },
      error:(err)=>{console.log(err)}
    });
  }
}
