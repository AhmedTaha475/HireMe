import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Login } from 'src/app/Models/Login/login';
import { UserLoginServiceService } from 'src/app/Services/Freelancer/user-login-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    public translate: TranslateService,
    public servic: UserLoginServiceService,
    private _Router: Router
  )

  {
    translate.setDefaultLang('en');
    translate.use('en');
  }
  
  errormsg:any='';
  validpass:any=true
  validemail=true;


  formValidation2=new FormGroup({ 
    email:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required),
    
  })

  add(email: any, password: any) {
this.validpass=this.formValidation2.controls['password'].valid
this.validemail=this.formValidation2.controls['email'].valid
    var user =new Login(email, password );
    this.servic.LoginUser(user).subscribe({
      next: (data:any) => {
        console.log(data.roles[0]);
        if (data.roles[0]=="Client")
        this._Router.navigateByUrl('/Home');
        if (data.roles[0]=="Freelancer")
        this._Router.navigateByUrl('/Home');
        else
        this._Router.navigateByUrl('/Home');
      },
      error: (err) => {
        console.log(err.error.errors)
        this.errormsg="UserName Or Password Dont Match Any Account"
      },
    });
  }


}
