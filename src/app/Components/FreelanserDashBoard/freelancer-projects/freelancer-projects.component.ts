import { Component, OnInit } from '@angular/core';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { ProjectPostService } from 'src/app/Services/project-post.service';

@Component({
  selector: 'app-freelancer-projects',
  templateUrl: './freelancer-projects.component.html',
  styleUrls: ['./freelancer-projects.component.css']
})
export class FreelancerProjectsComponent implements OnInit {
currentFreelancer:any;
allProjects:any;
freelancerProjects:any;
  constructor(private freelancerService: FreelancerService, private projectPostService: ProjectPostService){}
  ngOnInit(): void {
    this.freelancerService.GetCurrentFreelancer().subscribe({
      next:(data:any)=>{
        this.currentFreelancer = data.body;
      },
      error:(err:any)=>{
      }

    })
    this.projectPostService.GetAllProjectPosts().subscribe({
      next:(data:any)=>{
        this.allProjects = data;
        // logic to filter allProjects to get freelancerProjects
        this.freelancerProjects = this.allProjects;
        console.log(this.allProjects);
      },
      error:(err:any)=>{
      }
    })

  }
}
