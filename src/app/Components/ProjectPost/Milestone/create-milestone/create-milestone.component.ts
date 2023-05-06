import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateMilestone } from 'src/app/Models/Milestone/create-milestone';
import { ClientService } from 'src/app/Services/client.service';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { MilestoneService } from 'src/app/Services/milestone.service';
import { ProjectPostApplicantsService } from 'src/app/Services/project-post-applicants.service';

@Component({
  selector: 'app-create-milestone',
  templateUrl: './create-milestone.component.html',
  styleUrls: ['./create-milestone.component.css']
})
export class CreateMilestoneComponent implements OnInit {
  projectPostId:any;
  applicants:any;
  freelancers: any[] = [];
  applicantId:any;
  clientBalance:any;
  createMilestone = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    value: new FormControl('', [
      Validators.required,
    ])
  })
  constructor(
    private myRoute:ActivatedRoute,
    private myRouter: Router,
    private milestoneService:MilestoneService,
    private applicantService: ProjectPostApplicantsService,
    private freelancerService: FreelancerService,
    private clientService: ClientService
    ){
    this.projectPostId = myRoute.snapshot.params["id"];
  }
  ngOnInit(): void {
    //#region Get Clien Balance
    this.clientService.GetCurrentClient().subscribe({
      next:(data:any)=>{
        this.clientBalance = data.body.balance;
      },
      error:(err)=>{}
    })
    //#endregion
    this.applicantService.GetAllByProjectPostById(this.projectPostId).subscribe({
      next:(data)=>{
        this.applicants = data;
        this.applicants.forEach((applicant:any) => {
          this.freelancerService.GetFreelancerById(applicant.freelancerId).subscribe({
            next:(data:any)=>{
              this.freelancers.push(data.body);
            },
            error:(err)=>{}
          })
        });
        console.log(this.freelancers);
      },
      error:(err)=>{}
    })
  }
  confirmAdd(){
    if (this.createMilestone.valid)
    {
      //#region With Checking Client Balance
      // if(Number(this.createMilestone.get('value')?.value) <= this.clientBalance)
      // {
      //   let milestoneData = new CreateMilestone(
      //   this.createMilestone.get('name')?.value || '',
      //   Number(this.createMilestone.get('value')?.value).toString() || '0',
      //   this.projectPostId,
      //   // this.createMilestone.get('applicantId')?.value || '',
      //   ); 
      //   console.log(milestoneData);
      //   this.milestoneService.CreateMilestone(milestoneData).subscribe({
      //     next:(data)=>{
      //       this.myRouter.navigateByUrl('/ProjectPost/'+this.projectPostId)
      //     },
      //     error:(err)=>{console.log(err)}
      //   })
      // }
      // else{
      //   // logic if client balance is not enough
        
      // }
      //#endregion
     
      //#region Without Checking Client Balance
      if(true)
      {
        let milestoneData = new CreateMilestone(
        this.createMilestone.get('name')?.value || '',
        Number(this.createMilestone.get('value')?.value).toString() || '0',
        this.projectPostId,
        // this.createMilestone.get('applicantId')?.value || '',
        ); 
        console.log(milestoneData);
        this.milestoneService.CreateMilestone(milestoneData).subscribe({
          next:(data)=>{
            this.myRouter.navigateByUrl('/ProjectPost/'+this.projectPostId+'/Milestone/GetAll')
          },
          error:(err)=>{console.log(err)}
        })
      }
      else{
        // logic if client balance is not enough
      }
      //#endregion
    }
  }
}
// CreateMilestone {
//   constructor(
  //     public name: string,
  //     public value: string,
  //     public ProjectPostId: number,
//     public freelnacerId:string
//   ) {}
// }
