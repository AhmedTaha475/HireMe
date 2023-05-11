import { Component, OnInit } from '@angular/core';
import { LookupValueService } from '../Services/LookupValues_Service/lookup-value.service';
import { FreelancerService } from '../Services/freelancer.service';
import { Freelancer } from 'src/app/Models/Freelancer/freelancer';
import { StaticHelper } from '../Helpers/static-helper';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-browse-freelancers',
  templateUrl: './browse-freelancers.component.html',
  styleUrls: ['./browse-freelancers.component.css']
})
export class BrowseFreelancersComponent implements OnInit{
constructor(private lookvalue:LookupValueService,private FreelancerService:FreelancerService,public translate: TranslateService,
  ){
    translate.setDefaultLang('en');
    const langItem = localStorage.getItem('Lang');
    if (langItem !== null) {
      translate.use(langItem);
    }
}
FreeLancers:Freelancer[]=[];
CategoryNames:string[]=[];
isLoaded: boolean=false;
  ngOnInit(): void {
    this.FreelancerService.GetAllFreelancers().subscribe({
      next: (data: any) => {
    this.FreeLancers=data.body;
    if(this.FreeLancers.length>0){
      this.isLoaded=true;
    }
      },
      error:(err)=>{console.log(err);}
    })

    this.lookvalue.GetAllLookupvalueByLookuptableName("Category").subscribe({
      next: (data: any) => {
        //console.log(data);
        for(let i=0;i<data.length;i++){
          this.CategoryNames.push(data[i].valueName);
        }
        //console.log(this.CategoryNames);
      },
      error:(err)=>{console.log(err);}
    })
  }
  selectOption(event: any) {
    var name = event.target.value;
    //console.log(name);
   this.lookvalue.GetIdByName(name).subscribe(
    {
      next: (data: any) => {
        //console.log(data.id);
        this.FreelancerService.GetFreelancersByCatId(data.id).subscribe({
          next: (data: any) => {
            //console.log(data);
            this.FreeLancers=data;
          },
          error:(err)=>{console.log(err);}
        })
      },
      error:(err)=>{console.log(err);}
    }
   )
  }
}
