import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PlanService } from 'src/app/Services/Plan_Service/plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
})
export class PlanComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    public myplanservice: PlanService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
  ngOnInit(): void {
    this.myplanservice.GetAllPlans().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
