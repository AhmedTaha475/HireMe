import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateFreelancertMoney } from 'src/app/Models/Freelancer/update-freelancert-money';
import { CreatePPApplicant } from 'src/app/Models/ProjecetPostApplicant/create-ppapplicant';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { ProjectPostApplicantsService } from 'src/app/Services/project-post-applicants.service';

@Component({
  selector: 'app-create-project-post-applicant',
  templateUrl: './create-project-post-applicant.component.html',
  styleUrls: ['./create-project-post-applicant.component.css']
})
export class CreateProjectPostApplicantComponent implements OnInit {
  projectPostId:any;
  freelancer:any
  freelancerId:any;
  createApplicant = new FormGroup({
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
    private freelancerService: FreelancerService,
    ){
    this.projectPostId = myRoute.snapshot.params["id"];
  }
  ngOnInit(): void {
    this.freelancerService.GetCurrentFreelancer().subscribe({
      next:(data:any)=>{
        this.freelancer = data.body;
        this.freelancerId = this.freelancer.id;
        console.log(this.freelancerId.body.id);
      },
      error:(err)=>{}
    });
  }
  confirmAdd(){
    console.log(this.freelancer.bids);
    if (this.freelancer.bids <=0)
    {
      this.myRouter.navigateByUrl('/plan');
    }
    let applicantData = new CreatePPApplicant(
      this.projectPostId,
      Number(this.createApplicant.get('biddingPrice')?.value) || 0,
      this.createApplicant.get('proposal')?.value || '',
      this.freelancerId
    );

    console.log(applicantData);
    if (this.createApplicant.valid)
    {
      this.applicantService.CreateProjectPostApplicant(applicantData).subscribe({
        next:(data)=>{
          this.freelancerService.UpdateFreelancerMoney(new UpdateFreelancertMoney(
            null,-1,null,null,null
          )).subscribe({
            next:(data)=>{
              this.myRouter.navigateByUrl('/ProjectPost/'+this.projectPostId)
            },
            error:(err)=>{
              console.log(err)
            }
          })
        },
        error:(err)=>{console.log(err.error)}
      });
    }
  }
}
