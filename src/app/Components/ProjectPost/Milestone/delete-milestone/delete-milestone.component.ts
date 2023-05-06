import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MilestoneService } from 'src/app/Services/milestone.service';

@Component({
  selector: 'app-delete-milestone',
  templateUrl: './delete-milestone.component.html',
  styleUrls: ['./delete-milestone.component.css']
})
export class DeleteMilestoneComponent implements OnInit{
  milestoneId:any;
  milestone:any;
  constructor(
    private myRoute:ActivatedRoute,
    private myRouter: Router,
    private milestoneService:MilestoneService,
    ){
    this.milestoneId = myRoute.snapshot.params["milestoneId"];
  }
  ngOnInit(): void {
    this.milestoneService.GetMilestoneById(this.milestoneId).subscribe({
      next:(data)=>{
        this.milestone = data;
      },
      error:(err)=>{}
    })
  }
  confirmDelete(){
    this.milestoneService.DeleteMilestone(this.milestoneId).subscribe({
      next:(data)=>{
        this.myRouter.navigateByUrl('/ProjectPost/'+this.milestone.projectPostId+'/Milestone/GetAll')
      },
      error:(err)=>{}
    })
  }
}
