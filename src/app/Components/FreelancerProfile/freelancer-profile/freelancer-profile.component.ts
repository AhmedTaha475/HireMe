import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FreelancerService } from 'src/app/Services/freelancer.service';

@Component({
  selector: 'app-freelancer-profile',
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.css']
})
export class FreelancerProfileComponent implements OnInit  {
id:any;
myFreelancer:any ;
  constructor(public myActiveRoute:ActivatedRoute , public freelancer:FreelancerService) {
    this.id=myActiveRoute.snapshot.params["Id"]
  }

  ngOnInit(): void {
   this.freelancer.GetCurrentFreelancer().subscribe({
    next:(data)=>{this.myFreelancer=data},
    error:(err)=>{console.log(err)}
   })

  }

}
