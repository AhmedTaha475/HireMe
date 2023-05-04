import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GetClient } from 'src/app/Models/Client/get-client';
import { LookupValueService } from 'src/app/Services/LookupValues_Service/lookup-value.service';
import { MyServiseService } from 'src/app/Services/Registeraion/register';
import { ClientService } from 'src/app/Services/client.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css'],
})
export class UpdateClientComponent implements OnInit {
  currentclient: any;
  image: any;
  cv: any;
  allCategories: any;
  allPaymentMethods: any;
  //#region UpdateForm
  updateform = new FormGroup({
    id: new FormControl(''),
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    username: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(15),
      Validators.max(65),
    ]),
    ssn: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$'
      ),
    ]),
    paymentmethodId: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phonenumber: new FormControl('', [Validators.required]),
  });
  //#endregion
  changePasswordForm = new FormGroup({
    currentPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[^da-zA-Z]).{8,15}$'
      ),
    ]),
    newPasswordGroup: new FormGroup(
      {
        newPassword: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[^da-zA-Z]).{8,15}$'
          ),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      {
        validators: this.passwordMatchValidator,
      }
    ),
  });

  constructor(
    private ClientServ: ClientService,
    private lookupvaluesServ: LookupValueService,
    private registerServ: MyServiseService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.GetCurrentClient();
    this.getAllCategories();
    this.getAllPaymentMethods();
  }

  private GetCurrentClient() {
    this.ClientServ.GetCurrentClient().subscribe({
      next: (data: any) => {
        console.log('MyData');
        console.log(data);
        this.currentclient = {
          id: data.body.id,
          firstname: data.body.firstname,
          lastname: data.body.lastname,
          username: data.body.username,
          country: data.body.country,
          city: data.body.city,
          street: data.body.street,
          image: data.body.image,
          age: data.body.age,
          ssn: data.body.ssn,
          balance: data.body.balance,
          paymentmethodId: data.body.paymentmethodId,
          planId: data.body.planId,
          totalMoneySpent: data.body.totalMoneySpent,
          email: data.body.email,
          phonenumber: data.body.phonenumber,
        };
        for (let controlName in this.updateform.controls) {
          if (this.currentclient[controlName] == 'null')
            this.currentclient[controlName] = '';
          this.updateform
            .get(controlName)
            ?.setValue(this.currentclient[controlName] ?? '');
        }
      },
    });
  }

  getAllCategories() {
    this.lookupvaluesServ
      .GetAllLookupvalueByLookuptableName('Category')
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.allCategories = data;
        },
        error: (err: any) => console.log(err),
      });
  }
  getAllPaymentMethods() {
    this.lookupvaluesServ
      .GetAllLookupvalueByLookuptableName('PaymentMethod')
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.allPaymentMethods = data;
        },
        error: (err: any) => console.log(err),
      });
  }

  GetCurrentImage(event: any) {
    this.image = event.target.files[0];
  }

  updateClient() {
    console.log(this.updateform);
    if (this.updateform.valid) {
      let myData = new FormData();
      for (let controlName in this.updateform.controls) {
        myData.append(controlName, this.updateform.get(controlName)?.value);
      }
      myData.append('image', this.image);
      this.ClientServ.UpdateClient(myData).subscribe({
        next: (data: any) => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Profile Updated Successfully',
            life: 1500,
            key: 'profileToast',
          });
        },
        error: (err: any) => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Somethign went wrong......',
            life: 1500,
            key: 'profileToast',
          });
        },
      });
    }
  }
  passwordMatchValidator(control: AbstractControl) {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { mismatch: true };
  }
  editpassword() {
    console.log(this.changePasswordForm);
    if (this.changePasswordForm.valid) {
      const passwordobject = {
        oldPassword: this.changePasswordForm.get('currentPassword')?.value,
        NewPassword: this.changePasswordForm.get('newPasswordGroup.newPassword')
          ?.value,
      };
      this.registerServ.changePassword(passwordobject).subscribe({
        next: (data: any) => {
          console.log(data);
          this.changePasswordForm.reset();
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Password changed Successfully',
            life: 1500,
            key: 'passwordToast',
          });
        },
        error: (err: any) => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              'You entered wrong old password please check your password again',
            life: 1500,
            key: 'passwordToast',
          });
        },
      });
    }
  }
}
