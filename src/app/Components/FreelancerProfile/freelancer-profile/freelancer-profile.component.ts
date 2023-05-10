import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LookupValueService } from 'src/app/Services/LookupValues_Service/lookup-value.service';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import{StaticHelper} from 'src/app/Helpers/static-helper'
import { TranslateCompiler, TranslateService } from '@ngx-translate/core';
import { PortfolioService } from 'src/app/Services/Portfolio_Service/portfolio.service';
import { Portfolio } from 'src/app/Models/Portfolio/Portfolio';
import { GetProjectById } from 'src/app/Models/Project/get-project-by-id';
import { ProjectService } from 'src/app/Services/project.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MakeOfferComponent } from '../../make-offer/make-offer.component';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-freelancer-profile',
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.css']
})
export class FreelancerProfileComponent implements OnInit  {
  modalRef?: BsModalRef;
id:any;
myFreelancer:any ;
ports:Portfolio[]=[] ;
myPort:any ;
myProjects:GetProjectById[]=[];
role:any;

  constructor(public myActiveRoute:ActivatedRoute ,public user :AuthService  ,private modalService: BsModalService , public freelancer:FreelancerService , public translate: TranslateService , public port:PortfolioService , public projects:ProjectService) {
    this.id=myActiveRoute.snapshot.params["Id"]
    const langItem = localStorage.getItem('Lang');
    if (langItem != null) {
      translate.use(langItem);
    }

  }
  openModel(){
    this.modalRef = this.modalService.show(MakeOfferComponent);
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit(): void {
    this.role=  this.user.getRoles()
    console.log("++++++++++");
    console.log(this.role);
    console.log("++++++++++");
this.port.GetAllPortfolio().subscribe(
  {

    next:(data:any)=>{  data.forEach((element:any) => {
      // console.log(element);
this.ports.push(new Portfolio(element.portId,element.freelancerId))
    });}});


// console.log(this.ports);
   this.freelancer.GetFreelancerById(this.id).subscribe({
    next:(data:any)=>{this.myFreelancer=data.body;
      console.log(this.myFreelancer);
      this.myFreelancer.cv=StaticHelper.ConvertByteArrayToPdf(data.body.cv);
      this.myFreelancer.image=StaticHelper.ConvertByteArrayToImage(data.body.image);
      this.myPort = this.ports.filter(p=>p.freelancerId==this.myFreelancer.id)[0] ;
      // console.log("============")
      // console.log(this.myPort)
      // console.log("============")
      this.projects.GetProjectsByPortfolioId(this.myPort.portId).subscribe(
        {
        next:(mydata:any)=>{mydata.forEach((element:any) => {
this.myProjects.push(new GetProjectById(element.p_id,element.title,element.description,new Date(element.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),element.systemproject,element.moneyearned))
  });
// console.log(this.myProjects);

}

  }



        );
      },
    error:(err)=>{}
   })

  }

}

