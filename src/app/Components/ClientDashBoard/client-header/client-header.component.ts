import { Component, OnInit } from '@angular/core';
import { GetClient } from 'src/app/Models/Client/get-client';
import { AuthService } from 'src/app/Services/auth.service';
import { ClientService } from 'src/app/Services/client.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css'],
})
export class ClientHeaderComponent implements OnInit {
  currentClient: GetClient | null = null;
  constructor(public translate: TranslateService,
    private clientServ: ClientService,
    private authServ: AuthService
  ) {
    translate.setDefaultLang('en');
    const langItem = localStorage.getItem('Lang');
    if (langItem !== null) {
      translate.use(langItem);
    }
  }
  ngOnInit(): void {
    this.clientServ.GetCurrentClient().subscribe({
      next: (data: any) => {
        this.currentClient = new GetClient(
          data.body.id,
          data.body.firstname,
          data.body.lastname,
          data.body.username,
          data.body.county,
          data.body.city,
          data.body.street,
          data.body.image,
          data.body.age,
          data.body.ssn,
          data.body.balance,
          data.body.paymentmethodId,
          data.body.planId,
          data.body.totalMoneySpent,
          data.body.email,
          data.body.phonenumber
        );
      },
      error: (err: any) => console.log(err),
    });
  }

  logout() {
    this.authServ.logout();
  }
}
