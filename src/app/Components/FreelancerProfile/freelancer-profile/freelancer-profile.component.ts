import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LookupValueService } from 'src/app/Services/LookupValues_Service/lookup-value.service';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import{StaticHelper} from 'src/app/Helpers/static-helper'
import { TranslateCompiler, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-freelancer-profile',
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.css']
})
export class FreelancerProfileComponent implements OnInit  {
id:any;
myFreelancer:any ;


  constructor(public myActiveRoute:ActivatedRoute , public freelancer:FreelancerService , public translate: TranslateService) {
    this.id=myActiveRoute.snapshot.params["Id"]
    translate.setDefaultLang('en');
    translate.use('en');
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit(): void {
   this.freelancer.GetCurrentFreelancer().subscribe({
    next:(data:any)=>{this.myFreelancer=data.body;
      this.myFreelancer.cv=StaticHelper.ConvertByteArrayToPdf(data.body.cv);
      this.myFreelancer.image=StaticHelper.ConvertByteArrayToImage(data.body.image);

       console.log(data)},
    error:(err)=>{console.log(err)}
   })


  }


}
