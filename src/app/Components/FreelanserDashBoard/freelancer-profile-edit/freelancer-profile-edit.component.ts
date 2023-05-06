import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateFreelancerProfile } from 'src/app/Models/Freelancer/update-freelancer-profile';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { StaticHelper } from 'src/app/Helpers/static-helper';

@Component({
  selector: 'app-freelancer-profile-edit',
  templateUrl: './freelancer-profile-edit.component.html',
  styleUrls: ['./freelancer-profile-edit.component.css'],
})
export class FreelancerProfileEditComponent implements OnInit {
  image: any;
  cv: any;
  //#region UpdateRegion
  UpdateProfile = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    country: new FormControl('', []),
    city: new FormControl('', []),
    street: new FormControl('', []),
    age: new FormControl('', [Validators.min(0)]),
    ssn: new FormControl('', []),
    paymentmethodId: new FormControl('', []),
    categoryId: new FormControl('', []),
    email: new FormControl('', [Validators.email]),
    jobtitle: new FormControl('.NET', []),
    description: new FormControl('', [Validators.minLength(15)]),
    phonenumber: new FormControl('', []),
    averagerate: new FormControl('', [Validators.min(0)]),
  });
  //#endregion
  currentFreelancer: any;
  myImgUrl: any;
  myCv: any;
  pdfDataUrl?: string;

  constructor(private freelancerService: FreelancerService) {}
  ngOnInit(): void {
    this.freelancerService.GetCurrentFreelancer().subscribe({
      next: (data: any) => {
        this.currentFreelancer = data.body;
        console.log(data);
        for (let controlName in this.UpdateProfile.controls) {
          if (this.currentFreelancer[controlName] == 'null')
            this.currentFreelancer[controlName] = '';
          this.UpdateProfile.get(controlName)?.setValue(
            this.currentFreelancer[controlName] ?? ''
          );
        }
      },
      error: (err: any) => {
        console.log('Error');
      },
    });
  }

  GetCurrentImage(event: any) {
    this.image = event.target.files[0];
    console.log(event.target);
  }
  GetCurrentCv(e: any) {
    this.cv = e.target.files[0];
  }
  ConfirmUpdate() {
    if (this.UpdateProfile.valid) {
      let myData = new FormData();
      myData.append('id', this.currentFreelancer.id);
      myData.append('username', this.currentFreelancer.username);
      for (let controlName in this.UpdateProfile.controls) {
        myData.append(controlName, this.UpdateProfile.get(controlName)?.value);
      }
      myData.append('image', this.image);
      myData.append('CV', this.cv);
      this.freelancerService.UpdateFreelancer(myData).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
