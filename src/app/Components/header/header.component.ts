import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/Services/client.service';
import { GetClient } from 'src/app/Models/Client/get-client';
import { FreelancerService } from 'src/app/Services/freelancer.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // ClientExist: boolean = false;
  UserRole: string | null;
  client: any;
  freelancer: any;
  sidebarVisible: boolean = false;
  constructor(
    public translate: TranslateService,
    public _authService: AuthService,
    public clientService: ClientService,
    public freeService: FreelancerService //private router: Router
  ) {
    // this.ClientExist =
    //   _authService.getRoles()?.split(',').includes('Client') || false;
    this.UserRole = this._authService.getRoles();

    translate.setDefaultLang('en');
    const langItem = localStorage.getItem('Lang');
    if (langItem !== null) {
      translate.use(langItem);
    }
  }
  ngOnInit(): void {
    if (this._authService.isClient()) {
      this.clientService.GetCurrentClient().subscribe({
        next: (data: any) => {
          this.client = data.body;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    if (this._authService.isFreelancer()) {
      this.freeService.GetCurrentFreelancer().subscribe({
        next: (data: any) => {
          this.freelancer = data.body;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('Lang', language);
  }
  logout() {
    this._authService.logout();
  }
}
