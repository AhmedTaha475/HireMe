import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CreateProjectPost } from 'src/app/Models/ProjectPost/create-projectpost';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { ProjectPostService } from 'src/app/Services/project-post.service';
import {LookupValueService} from 'src/app/Services/LookupValues_Service/lookup-value.service';
import { Freelancer } from 'src/app/Models/Freelancer/freelancer';
import { StaticHelper } from 'src/app/Helpers/static-helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  Projects:CreateProjectPost[]=[];
  Freelancers:Freelancer[]=[];
  cat : any;
  constructor(public translate: TranslateService, private myService:ProjectPostService,private LookService:LookupValueService,private FLService:FreelancerService)  {
    translate.setDefaultLang('en');
    translate.use('en');
  }
  ngOnInit(): void {
   this.myService.GetAllProjectPosts().subscribe(
    {
      next: (data: any) => {
        this.Projects=data;
       console.log(this.Projects);
      },
      error: (error) => {

      },
    }
   );
   this.FLService.GetAllFreelancers().subscribe({
    next: (data: any) => {
      // console.log(data.body[0])
      for (let i = 0; i < data.body.length; i++) {        
        if ((data.body[i].rank == 4 || data.body[i].rank ==5)&& this.Freelancers.length <=6) {
          var freelancerTemp = data.body[i];
          if(freelancerTemp.image != null)
          freelancerTemp.image= StaticHelper.ConvertByteArrayToImage(data.body[i].image) ;
          freelancerTemp.cv = StaticHelper.ConvertByteArrayToPdf(data.body[i].cv);
this.Freelancers.push(freelancerTemp);
        }
      }
      console.log(this.Freelancers);
    },
    error: (error) => {

    },
   })
   //this.LookService.
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
  // responsiveOptions:any;
  // private carsoul (){
  //   this.responsiveOptions = [
  //     {
  //         breakpoint: '1400px',
  //         numVisible: 3,
  //         numScroll: 3
  //     },
  //     {
  //         breakpoint: '1220px',
  //         numVisible: 2,
  //         numScroll: 2
  //     },
  //     {
  //         breakpoint: '1100px',
  //         numVisible: 1,
  //         numScroll: 1
  //     }
  // ];
  // }
}
