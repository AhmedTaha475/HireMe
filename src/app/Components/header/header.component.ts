import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  ClientExist: boolean = false;
  constructor(
    public translate: TranslateService,
    private _authService: AuthService
  ) {
    this.ClientExist =
      _authService.getRoles()?.split(',').includes('Client') || false;

    translate.setDefaultLang('en');
    translate.use('en');
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
