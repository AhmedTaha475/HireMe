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
  ngOnInit(): void {
    this.myService.GetAllFreelancers().subscribe({
      next: (data: any) => {
        // console.log(data.body[0])
        for (let i = 0; i < data.body.length; i++) {        
          if (data.body[i].categoryId == this.CatId) {
            var freelancerTemp = data.body[i];
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

  }
}
