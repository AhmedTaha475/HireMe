import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserLoginServiceService } from 'src/app/Services/Freelancer/user-login-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public translate: TranslateService ,public servic:UserLoginServiceService) {
    translate.setDefaultLang('en');
    translate.use('en');}

    add(email:any,password:any){
      var user={email,password}
      console.log("hhhhhhhhhh")
      this.servic.LoginUser(user).subscribe();
        // {
        //   next:(res)=>{console.log(res)},
        //   error:(res)=>{console.log("errors")}
        // }
      
    }
}
