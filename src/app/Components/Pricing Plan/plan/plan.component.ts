import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
})
export class PlanComponent {
  constructor(public translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
