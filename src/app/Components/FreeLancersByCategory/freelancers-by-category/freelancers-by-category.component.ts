import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { Freelancer } from 'src/app/Models/Freelancer/freelancer';
import { StaticHelper } from 'src/app/Helpers/static-helper';
@Component({
  selector: 'app-freelancers-by-category',
  templateUrl: './freelancers-by-category.component.html',
  styleUrls: ['./freelancers-by-category.component.css']
})
export class FreelancersByCategoryComponent implements OnInit {
  CatId: any;
  Freelancers: Freelancer[]=[];
  constructor(myActivated: ActivatedRoute, private myService: FreelancerService) {
    this.CatId = myActivated.snapshot.params["id"];
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
            for(let i=0;i<freelancerTemp.length;i++){
              freelancerTemp[i].image= StaticHelper.ConvertByteArrayToImage(data[i].image) ;
              freelancerTemp[i].cv = StaticHelper.ConvertByteArrayToPdf(data[i].cv);
            }

        console.log(freelancerTemp)   
        this.Freelancers=freelancerTemp;
      },
      error: (error) => {

      },
    })

  }
}
