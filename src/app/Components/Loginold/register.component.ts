import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserLoginServiceService } from 'src/app/Services/user-login-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(public translate: TranslateService ,public servic:UserLoginServiceService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
  add(email:any,password:any){
    var user={email,password}
    console.log("hhhhhhhhhh")
    this.servic.LoginUser(user).subscribe(
      // {
      //   next:(res)=>{console.log(res)},
      //   error:(res)=>{console.log("errors")}
      // }
    );


  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
