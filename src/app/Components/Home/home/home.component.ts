import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
