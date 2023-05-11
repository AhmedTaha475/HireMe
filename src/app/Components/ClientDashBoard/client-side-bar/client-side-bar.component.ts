import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-client-side-bar',
  templateUrl: './client-side-bar.component.html',
  styleUrls: ['./client-side-bar.component.css'],
})
export class ClientSideBarComponent {
  constructor(private authServ: AuthService,public translate: TranslateService) {
    translate.setDefaultLang('en');
    const langItem = localStorage.getItem('Lang');
    if (langItem !== null) {
      translate.use(langItem);
    }
  }

  logout() {
    this.authServ.logout();
  }
}
