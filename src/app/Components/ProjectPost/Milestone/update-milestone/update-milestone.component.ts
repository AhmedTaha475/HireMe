import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UpdateClientMoney } from 'src/app/Models/Client/update-client-money';
import { UpdateMilestone } from 'src/app/Models/Milestone/update-milestone';
import { ClientService } from 'src/app/Services/client.service';
import { MilestoneService } from 'src/app/Services/milestone.service';
@Component({
  selector: 'app-update-milestone',
  templateUrl: './update-milestone.component.html',
  styleUrls: ['./update-milestone.component.css'],
})
export class UpdateMilestoneComponent implements OnInit {
  milestoneId: any;
  oldMilesone: any;
  clientBalance: any;
  updateMilestone = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    value: new FormControl(0, [Validators.required]),
  });
  constructor(
    private myRoute: ActivatedRoute,
    private myRouter: Router,
    private milestoneService: MilestoneService,
    private clientService: ClientService,
    private messageService: MessageService
  ) {
    this.milestoneId = myRoute.snapshot.params['milestoneId'];
  }
  ngOnInit(): void {
    this.milestoneService.GetMilestoneById(this.milestoneId).subscribe({
      next: (data) => {
        this.oldMilesone = data;
        console.log(data);
        this.updateMilestone.get('name')?.setValue(this.oldMilesone.name);
        this.updateMilestone.get('value')?.setValue(this.oldMilesone.value);
      },
      error: (err) => {
        console.log(err);
      },
    });
    //#region Get Clien Balance
    this.clientService.GetCurrentClient().subscribe({
      next: (data: any) => {
        this.clientBalance = data.body.balance;
      },
      error: (err) => {},
    });
    //#endregion
  }
  confirmUpdate() {
    if (this.updateMilestone.valid) {
      let valueDelta =
        (this.updateMilestone.get('value')?.value ?? 0) -
        Number(this.oldMilesone.value);
      //check value new > value old --
      //check value new < value old --
      console.log('this is value delta' + valueDelta);
      if (valueDelta > 0) {
        if (valueDelta <= this.clientBalance) {
          //#region With Checking Client Balance
          let milestoneData = new UpdateMilestone(
            this.updateMilestone.get('name')?.value || '',
            Number(this.updateMilestone.get('value')?.value).toString() || '0'
          );
          this.milestoneService
            .UpdateMilestone(this.milestoneId, milestoneData)
            .subscribe({
              next: (data) => {
                console.log('Updated Mile Stone');
                this.clientService
                  .UpdateClientMoney(
                    new UpdateClientMoney(-valueDelta, valueDelta, null)
                  )
                  .subscribe({
                    next: (data: any) => {
                      console.log(data);
                    },
                    error: (err: any) => {
                      console.log(err);
                    },
                  });
                this.messageService.clear();
                this.messageService.add({
                  severity: 'success',
                  summary: 'Updated',
                  detail: 'Milestone Updated Successfully',
                  life: 1500,
                  key: 'milestone',
                });
                setTimeout(() => {
                  this.myRouter.navigateByUrl(
                    '/client/ProjectPost/' +
                      this.oldMilesone.projectPostId +
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
      } else {
        //#region With Checking Client Balance
        let milestoneData = new UpdateMilestone(
          this.updateMilestone.get('name')?.value || '',
          Number(this.updateMilestone.get('value')?.value).toString() || '0'
        );
        this.milestoneService
          .UpdateMilestone(this.milestoneId, milestoneData)
          .subscribe({
            next: (data) => {
              this.clientService
                .UpdateClientMoney(
                  new UpdateClientMoney(-valueDelta, valueDelta, null)
                )
                .subscribe({
                  next: (data: any) => {
                    console.log(data);
                  },
                  error: (err: any) => {
                    console.log(err);
                  },
                });
              this.messageService.clear();
              this.messageService.add({
                severity: 'success',
                summary: 'Updated',
                detail: 'Milestone Updated Successfully',
                life: 1500,
                key: 'milestone',
              });
              setTimeout(() => {
                this.myRouter.navigateByUrl(
                  '/client/ProjectPost/' +
                    this.oldMilesone.projectPostId +
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
      }

      //#endregion

      //#region Without Checking Client Balance

      //#endregion
    }
  }
}
