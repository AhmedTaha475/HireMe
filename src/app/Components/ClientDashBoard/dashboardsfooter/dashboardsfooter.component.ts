import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboardsfooter',
  templateUrl: './dashboardsfooter.component.html',
  styleUrls: ['./dashboardsfooter.component.css']
})
export class DashboardsfooterComponent {
constructor(public translate: TranslateService){
  //translate.setDefaultLang('en');
  const langItem = localStorage.getItem('Lang');
  if (langItem !== null) {
    translate.use(langItem);
  }
}
}
