import { Component, OnInit } from '@angular/core';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { OfferService } from 'src/app/Services/offer.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  CurrenFreelancer:any;
  AllOffers:any
constructor(public Freelancer:FreelancerService,public offerservice:OfferService){

}
  ngOnInit(): void {
    this.Freelancer.GetCurrentFreelancer().subscribe({
      next:(data:any)=>{this.CurrenFreelancer=data.body.id;console.log(this.CurrenFreelancer);
        this.offerservice.GetAllByFreelancerId(this.CurrenFreelancer).subscribe({
          next:(data)=>{console.log(data);this.AllOffers=data },
          error:()=>{}
        })     
      },
      error:()=>{}
    })
    
  }


}
