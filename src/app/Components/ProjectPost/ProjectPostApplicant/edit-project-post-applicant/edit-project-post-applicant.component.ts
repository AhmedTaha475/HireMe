import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private applicantService:ProjectPostApplicantsService,
    private freelancerService: FreelancerService
    ){
    this.projectPostId = myRoute.snapshot.params["id"];
  }
  ngOnInit(): void {
    this.freelancerService.GetCurrentFreelancer().subscribe({
      next:(data)=>{
        this.freelancer = data;
        this.freelancerId = this.freelancer.body.id;
        console.log(this.freelancerId.body.id);
      },
      error:(err)=>{}
    });
  }
  confirmAdd(){
    let applicantData = new CreatePPApplicant(
      this.projectPostId,
      Number(this.createApplicant.get('biddingPrice')?.value) || 0,
      this.createApplicant.get('proposal')?.value || '',
      this.freelancerId
    );
    console.log(applicantData);
    // this.applicantService.CreateProjectPostApplicant(applicantData).subscribe({
    //   next:(data)=>{

    //   },
    //   error:(err)=>{}
    // });
  }
}
