import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UpdateClientMoney } from 'src/app/Models/Client/update-client-money';
import { CreateMilestone } from 'src/app/Models/Milestone/create-milestone';
import { ClientService } from 'src/app/Services/client.service';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { MilestoneService } from 'src/app/Services/milestone.service';
import { ProjectPostApplicantsService } from 'src/app/Services/project-post-applicants.service';

@Component({
  selector: 'app-create-milestone',
  templateUrl: './create-milestone.component.html',
  styleUrls: ['./create-milestone.component.css'],
})
export class CreateMilestoneComponent implements OnInit {
  projectPostId: any;
  applicants: any;
  freelancers: any[] = [];
  applicantId: any;
  clientBalance: any;
  createMilestone = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    value: new FormControl('', [Validators.required]),
  });
  constructor(
    private myRoute: ActivatedRoute,
    private myRouter: Router,
    private milestoneService: MilestoneService,
    private clientService: ClientService,
    private messageService: MessageService
  ) {
    this.projectPostId = myRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    //#region Get Clien Balance
    this.clientService.GetCurrentClient().subscribe({
      next: (data: any) => {
        this.clientBalance = data.body.balance;
        console.log('client balance= ' + this.clientBalance);
      },
      error: (err) => {
        console.log(err);
      },
    });
    //#endregion
  }
  confirmAdd() {
    if (this.createMilestone.valid) {
      //#region With Checking Client Balance
      if (
        Number(this.createMilestone.get('value')?.value) <= this.clientBalance
      ) {
        let milestoneData = new CreateMilestone(
          this.createMilestone.get('name')?.value || '',
          Number(this.createMilestone.get('value')?.value).toString() || '0',
          this.projectPostId
        );
        console.log(milestoneData);
        this.milestoneService.CreateMilestone(milestoneData).subscribe({
          next: (data) => {
            console.log(data);
            //#region Decrease Client Balance
            let newBalance = Number(this.createMilestone.get('value')?.value);
            let clientData = new UpdateClientMoney(
              -newBalance,
              newBalance,
              null
            );
            this.clientService.UpdateClientMoney(clientData).subscribe({
              next: (data) => {
                console.log(data);
              },
              error: (err) => {
                console.log(err);
              },
            });
            //#endregion
            this.messageService.clear();
            this.messageService.add({
              severity: 'success',
              summary: 'Created',
              detail: 'Milestone created Successfully',
              life: 1500,
              key: 'milestone',
            });
            setTimeout(() => {
              this.myRouter.navigateByUrl(
                '/client/ProjectPost/' +
                  this.projectPostId +
                  '/Milestone/GetAll'
              );
            }, 1500);
          },
          error: (err) => {
            console.log(err);
            this.messageService.clear();
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Somethign went wrong......',
              life: 1500,
              key: 'milestone',
            });
          },
        });
      } else {
        this.myRouter.navigateByUrl('/client/DepositeMoney');
      }
    }
  }
}
