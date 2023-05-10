import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TransactionService } from 'src/app/Services/Transaction_Service/transaction.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-freelancer-header',
  templateUrl: './freelancer-header.component.html',
  styleUrls: ['./freelancer-header.component.css'],
})
export class FreelancerHeaderComponent implements OnInit {
  constructor(private authServ: AuthService , public translate:TranslateService) {
    const langItem = localStorage.getItem('Lang');
    if (langItem != null) {
      translate.use(langItem);
    }
  }
  ngOnInit(): void {}
  logout() {
    this.authServ.logout();
  }
}
