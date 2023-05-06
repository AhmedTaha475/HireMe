import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // ClientExist: boolean = false;
  UserRole:string|null;
  constructor(
    public translate: TranslateService,
    public _authService: AuthService,
    //private router: Router
  ) {
    // this.ClientExist =
    //   _authService.getRoles()?.split(',').includes('Client') || false;
    this.UserRole=this._authService.getRoles();
    
      translate.setDefaultLang('en');
      const langItem = localStorage.getItem('lang');
  if (langItem !== null) {
    translate.use(langItem);}
  }
  // public get UserRole():string|null{
  //   return this._UserRole;
  // }
  // public set UserRole (value: string|null) {
  //   this._UserRole = value;
  //   window.location.reload()
  //   //Write your code here
  //   console.log (this.UserRole);
  // }
  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('Lang',language);
  }
  
}
