import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { Freelancer } from 'src/app/Models/Freelancer/freelancer';
import { StaticHelper } from 'src/app/Helpers/static-helper';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-freelancers-by-category',
  templateUrl: './freelancers-by-category.component.html',
  styleUrls: ['./freelancers-by-category.component.css']
})
export class FreelancersByCategoryComponent implements OnInit {
  CatId: any;
  Freelancers: Freelancer[]=[];
  isLoaded:boolean=false;
  constructor(myActivated: ActivatedRoute, private myService: FreelancerService,public translate: TranslateService,) {
    this.CatId = myActivated.snapshot.params["id"];
    translate.setDefaultLang('en');
    const langItem = localStorage.getItem('lang');
    if (langItem !== null) {
      translate.use(langItem);
    }
  }
  first: number = 0;

    rows: number =3;

    onPageChange(event:any) {
        this.first = event.first;
        this.rows = event.rows;
      }


  ngOnInit(): void {
    this.myService.GetFreelancersByCatId(this.CatId).subscribe({
      next: (data: any) => {
            var freelancerTemp = data; 
            

        //console.log(freelancerTemp)   
        this.Freelancers=freelancerTemp;
        if(this.Freelancers.length>0){
          this.isLoaded=true;
        }
      },
      error: (error) => {

      },
    })

  }
}
