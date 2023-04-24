import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GetPlan } from 'src/app/Models/Plan/Get_Plan';
import { PlanService } from 'src/app/Services/Plan_Service/plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
})
export class PlanComponent implements OnInit {
  plans: any;
  errors: any;

  constructor(
    public translate: TranslateService,
    public myplanservice: PlanService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
  ngOnInit(): void {
    this.myplanservice.GetAllPlans().subscribe({
      next: (data: any) => {
        // data.forEach((element: any) => {
        //   this.plans = new GetPlan(
        //     data.id,
        //     data.name,
        //     data.escription,
        //     data.price,
        //     data.bids
        //   );
        // });
        this.plans = data;
      },
      error: (err) => {
        this.errors = err;
      },
    });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
