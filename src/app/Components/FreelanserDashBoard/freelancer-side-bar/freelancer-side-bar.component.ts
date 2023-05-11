import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-freelancer-side-bar',
  templateUrl: './freelancer-side-bar.component.html',
  styleUrls: ['./freelancer-side-bar.component.css'],
})
export class FreelancerSideBarComponent {
  constructor(
    private authServ: AuthService,
    public translate: TranslateService
  ) {
    const langItem = localStorage.getItem('Lang');
    if (langItem != null) {
      translate.use(langItem);
    }
  }
  logout() {
    this.authServ.logout();
  }
}
