import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MyServiseService } from 'src/app/Services/register';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {
  constructor(public translate: TranslateService,private http: HttpClient ,public servise:MyServiseService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
  
  // this.http.post('https://api.example.com/addUser', { name: 'John Doe', email: 'john.doe@example.com' })
  // .subscribe(response => {
  //   console.log('API response:', response);
  // });
  Add(fname:any,lname:any,uname:any, email:any, password:any,cpassword:any){
    var user={firstName:fname,lastname:lname,userName:uname,email:email,password:password,confirmPassword:cpassword}
    this.servise.CreateUser(user).subscribe();
    // this.router.navigate(['/Users']);
    }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
