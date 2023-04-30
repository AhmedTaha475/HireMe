import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateFreelancerProfile } from 'src/app/Models/Freelancer/update-freelancer-profile';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { StaticHelper } from 'src/app/Helpers/static-helper';

@Component({
  selector: 'app-freelancer-profile-edit',
  templateUrl: './freelancer-profile-edit.component.html',
  styleUrls: ['./freelancer-profile-edit.component.css']
})
export class FreelancerProfileEditComponent implements OnInit {
    //#region UpdateRegion
    UpdateProfile = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      lastname: new FormControl('',[
        Validators.required,
      ]),
      country: new FormControl('',[
        Validators.required,
      ]),
      city: new FormControl('',[
        Validators.required,
      ]),
      street: new FormControl('',[
        Validators.required,
      ]),
      age: new FormControl('',[
        Validators.required,
      ]),
      ssn: new FormControl('',[
        Validators.required,
      ]),
      paymentmethodId: new FormControl('',[
        Validators.required,
      ]),
      categoryId: new FormControl('',[
        Validators.required,
      ]),
      email: new FormControl('',[
        Validators.required,
      ]),
      jobtitle: new FormControl('',[
        Validators.required,
      ]),
      description: new FormControl('',[
        Validators.required,
      ]),
      phonenumber: new FormControl('',[
        Validators.required,
      ]),
      averagerate: new FormControl('',[
        Validators.required,
      ]),
      image: new FormControl('',[
        Validators.required,
      ]),
      cv: new FormControl('',[
        Validators.required,
      ]),
    });
    //#endregion
    currentFreelancer: any;
    myImgUrl:any
    constructor(
      private freelancerService: FreelancerService,
      ){

      }
      ngOnInit(): void {
        this.freelancerService.GetCurrentFreelancer()
         .subscribe({
          next: (data: any) => {
            this.currentFreelancer = data.body;
            if (this.currentFreelancer.image == null)
              this.myImgUrl = "assets/images/user-avatar-placeholder.png";
            else 
              this.myImgUrl = StaticHelper.ConvertByteArrayToImage(this.currentFreelancer.image);
            console.log(this.myImgUrl, data);
          },
          error: (err: any) => {
            console.log("Error");
          },
        });

        //this.UpdateProfile.get('firstname')?.setValue(this.currentFreelancer.firstname);
      }

      ConfirmUpdate(){

        if (!this.UpdateProfile.valid){
          let myData = new FormData();
          // Assume we have a FormGroup called myForm
          myData.append('id',this.currentFreelancer.id);
          myData.append('nnnn',"myName")
          console.log(myData);
          myData.append('username',this.currentFreelancer.username);
        for (let controlName in this.UpdateProfile.controls) {
          myData.append(controlName,this.UpdateProfile.get(controlName)?.value);
        }
        this.freelancerService.UpdateFreelancer(myData)
        .subscribe({
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
