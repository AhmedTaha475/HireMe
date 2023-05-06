import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MilestoneService } from 'src/app/Services/milestone.service';

@Component({
  selector: 'app-project-post-milestones',
  templateUrl: './project-post-milestones.component.html',
  styleUrls: ['./project-post-milestones.component.css']
})
export class ProjectPostMilestonesComponent implements OnInit {
  projectPostId:any;
  milestones:any;
  constructor(
  private myRoute:ActivatedRoute,
  private myRouter: Router,
  private milestoneService:MilestoneService,
  ){
    this.projectPostId = myRoute.snapshot.params["id"];
  }
  ngOnInit(): void {
    this.milestoneService.GetMilestroneByProjectId(this.projectPostId).subscribe({
      next:(data)=>{
        this.milestones = data;
      },
      error:(err)=>{}
    })
  }
}
