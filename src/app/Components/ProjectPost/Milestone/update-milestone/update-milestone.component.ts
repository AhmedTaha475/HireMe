import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateMilestone } from 'src/app/Models/Milestone/update-milestone';
import { ClientService } from 'src/app/Services/client.service';
import { MilestoneService } from 'src/app/Services/milestone.service';
@Component({
  selector: 'app-update-milestone',
  templateUrl: './update-milestone.component.html',
  styleUrls: ['./update-milestone.component.css']
})
export class UpdateMilestoneComponent implements OnInit {
  milestoneId:any;
  oldMilesone:any;
  clientBalance:any;
  updateMilestone = new FormGroup({
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
    private clientService:ClientService
  ){
    this.milestoneId = myRoute.snapshot.params["milestoneId"];
  }
  ngOnInit(): void {
    this.milestoneService.GetMilestoneById(this.milestoneId).subscribe({
      next:(data)=>{
        this.oldMilesone = data;
        console.log(data);
        this.updateMilestone.get('name')?.setValue(this.oldMilesone.name);
        this.updateMilestone.get('value')?.setValue(this.oldMilesone.value);
      },
      error:(err)=>{console.log(err)}
    })
        //#region Get Clien Balance
        this.clientService.GetCurrentClient().subscribe({
          next:(data:any)=>{
            this.clientBalance = data.body.balance;
          },
          error:(err)=>{}
        })
        //#endregion
  }
  confirmUpdate(){
    if (this.updateMilestone.valid)
    {
      //#region With Checking Client Balance
      // if(Number(this.updateMilestone.get('value')?.value) <= this.clientBalance)
      // {
      //   let milestoneData = new UpdateMilestone(
      //     this.updateMilestone.get('name')?.value || '',
      //     Number(this.updateMilestone.get('value')?.value).toString() || '0',
      //     );
      //     this.milestoneService.UpdateMilestone(this.milestoneId,milestoneData).subscribe({
      //       next:(data)=>{
      //         //this.myRouter.navigateByUrl('/ProjectPost/'+this.projectPostId)
      //       },
      //       error:(err)=>{console.log(err)}
      //     })
      // }
      // else{
      //   // logic if client balance is not enough

      // }
      //#endregion

      //#region Without Checking Client Balance
      if(true)
      {
        let milestoneData = new UpdateMilestone(
        this.updateMilestone.get('name')?.value || '',
        Number(this.updateMilestone.get('value')?.value).toString() || '0',
        );
        this.milestoneService.UpdateMilestone(this.milestoneId,milestoneData).subscribe({
          next:(data)=>{
            this.myRouter.navigateByUrl('/ProjectPost/'+this.oldMilesone.projectPostId+'/Milestone/GetAll')
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
