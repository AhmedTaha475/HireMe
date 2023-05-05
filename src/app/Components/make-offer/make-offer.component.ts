import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOffer } from 'src/app/Models/Offer/create-offer';
import { GetOffer } from 'src/app/Models/Offer/get-offer';
import { AuthService } from 'src/app/Services/auth.service';
import { ClientService } from 'src/app/Services/client.service';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { OfferService } from 'src/app/Services/offer.service';

@Component({
  selector: 'app-make-offer',
  templateUrl: './make-offer.component.html',
  styleUrls: ['./make-offer.component.css']
})
export class MakeOfferComponent implements OnInit {
  freelancerId:any;
  clientId:any;
  freelancer:any
freelancerName:any;
  constructor(public myActiveRoute:Router  ,  public offerService: OfferService , public clientServ:ClientService , public freelancerServ:FreelancerService)
  {
    this.freelancerId=this.myActiveRoute.routerState.snapshot.url.split("/")[2];
    // console.log(this.freelancerId)
  }

  ngOnInit(): void {


    this.freelancerServ.GetFreelancerById(this.freelancerId).subscribe({
next:(data:any)=>{this.freelancerName= data.body.firstname}

}
    );
    // console.log(this.freelancerId)
    this.clientServ.GetCurrentClient().subscribe({
      next:(data:any)=>{this.clientId= data.body.id;
       console.log(this.freelancerId)
       console.log(this.clientId)

      },
     error:(err:any)=>{}
    })




  }
  addOffer(fullName:any , email:any, msg:any)
  {
    let offerDate = new Date();
    console.log(offerDate);
    let accepted = true ;
    let myOffer:CreateOffer = new CreateOffer(fullName ,email,msg,this.clientId,this.freelancerId,accepted,offerDate)
this.offerService.CreateOffer(myOffer).subscribe({
next:(data:any)=>{console.log(data)},
error:(err:any)=>{console.log(err)}
})


}
}
