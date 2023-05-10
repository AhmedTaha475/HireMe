import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { OfferService } from 'src/app/Services/offer.service';
import { ProjectPostService } from 'src/app/Services/project-post.service';
import { CreateProjectPost } from 'src/app/Models/ProjectPost/create-projectpost';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  CurrenFreelancer:any;
  AllOffers:any
  updatedoofer:any
constructor(public translate:TranslateService ,  public Freelancer:FreelancerService,public offerservice:OfferService,private location: Location,public PPost:ProjectPostService){
  const langItem = localStorage.getItem('Lang');
  if (langItem != null) {
    translate.use(langItem);
  }
}
reject=false;
  ngOnInit(): void {
    this.Freelancer.GetCurrentFreelancer().subscribe({
      next:(data:any)=>{this.CurrenFreelancer=data.body.id;console.log(this.CurrenFreelancer);
        this.offerservice.GetAllByFreelancerId(this.CurrenFreelancer).subscribe({
          next:(data)=>{console.log(data);this.AllOffers=data ;},
          error:()=>{}
        })
      },
      error:()=>{}
    })

  }
refuse(id:any){
this.offerservice.GetOfferById(id).subscribe(
  {next:(data:any)=>{console.log(data);
  this.updatedoofer=data;
  this.updatedoofer.accepted=false
  this.offerservice.UpdateOffer(this.updatedoofer).subscribe({
    next:(data:any)=>{this.refresh(); },
    error:()=>{}
  })

  },
error:()=>{}})


}
refresh(): void {
  // this.location.go('/');
  window.location.reload();
}

Accept(id:any){
  this.offerservice.GetOfferById(id).subscribe(
    {next:(data:any)=>{console.log(data);
    this.updatedoofer=data;
    this.updatedoofer.accepted=true;
    this.offerservice.UpdateOffer(this.updatedoofer).subscribe({
      next:(data)=>{
        this.refresh();
        let projectPost = {
          postTitle: this.updatedoofer.fullname || '',
          description: this.updatedoofer.message|| '',
          averagePrice: 100 ,
          projectPostDate: new Date(),
          categoryId: 7,
          done: false,
          location: null,
        };
        this.PPost.CreateProjectPost(projectPost).subscribe({
          next:(data)=>{console.log(data)},
          error:(error)=>{console.log(error)}
        })


      },
      error:()=>{}
    })
}})}



}
