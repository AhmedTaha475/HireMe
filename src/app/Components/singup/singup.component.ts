import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MyServiseService } from 'src/app/Services/Registeraion/register';
import { Register } from 'src/app/Models/Register/register';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
})
export class SingupComponent {
  constructor(
    public translate: TranslateService,
    private http: HttpClient,
    public servise: MyServiseService,
    public router: Router
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
  checkvalue: any;
  obj: any;
  Keys: any;

  formValidation = new FormGroup({
    firstName: new FormControl('', [
      Validators.minLength(4),
      Validators.required,
    ]),
    lastName: new FormControl(null, [
      Validators.minLength(4),
      Validators.required,
    ]),
    UserName: new FormControl(null, [
      Validators.minLength(4),
      Validators.required,
    ]),
    Email: new FormControl(null, [
      Validators.minLength(4),
      Validators.email,
      Validators.required,
    ]),
    Password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).{6,}$'),
    ]),
    cpassword: new FormControl(null, [Validators.required]),
  });

  get fnamevalid() {
    return this.formValidation.controls['firstName'].valid;
  }
  get lnamevalid() {
    return this.formValidation.controls['lastName'].valid;
  }
  get UserNamevalid() {
    return this.formValidation.controls['UserName'].valid;
  }
  get Emailvalid() {
    return this.formValidation.controls['Email'].valid;
  }
  get passwordvalid() {
    return this.formValidation.controls['Password'].valid;
  }

  Add(
    fname: any,
    lname: any,
    uname: any,
    email: any,
    password: any,
    cpassword: any
  ) {
    // console.log(this.formValidation.controls["firstName"].value)
    var user = new Register(fname, lname, uname, email, password, cpassword);
    console.log(user);
    if (this.checkvalue == 'Freelancer') {
      this.servise.CreateFreelancer(user).subscribe({
        next: (data) => {
          console.log('Added succsessfully');
          this.router.navigate(['/Login']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.servise.CreateClient(user).subscribe({
        next: (data) => {
          console.log('Added succsessfully');
          this.router.navigate(['/Login']);
        },
        error: (error) => {
          // this.obj = error.error.errors;
          // this.Keys = Object.keys(this.obj);
          // console.log(this.obj);
        },
      });
    }
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
