import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UpdateClientMoney } from 'src/app/Models/Client/update-client-money';
import { ClientService } from 'src/app/Services/client.service';
import { MilestoneService } from 'src/app/Services/milestone.service';

@Component({
  selector: 'app-delete-milestone',
  templateUrl: './delete-milestone.component.html',
  styleUrls: ['./delete-milestone.component.css'],
})
export class DeleteMilestoneComponent implements OnInit {
  milestoneId: any;
  milestone: any;
  currentClient: any;
  constructor(
    private myRoute: ActivatedRoute,
    private myRouter: Router,
    private milestoneService: MilestoneService,
    private messageService: MessageService,
    private ClientServ: ClientService
  ) {
    this.milestoneId = myRoute.snapshot.params['milestoneId'];
  }
  ngOnInit(): void {
    this.milestoneService.GetMilestoneById(this.milestoneId).subscribe({
      next: (data) => {
        this.milestone = data;
      },
      error: (err) => {},
    });
  }
  confirmDelete() {
    this.milestoneService.DeleteMilestone(this.milestoneId).subscribe({
      next: (data) => {
        this.ClientServ.UpdateClientMoney(
          new UpdateClientMoney(
            Number(this.milestone.value),
            -Number(this.milestone.value),
            null
          )
        ).subscribe({
          next: (data: any) => {
            console.log(data);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
        this.messageService.clear();
        this.messageService.add({
          severity: 'warn',
          summary: 'Deleted',
          detail: 'Milestone Deleted Successfully',
          life: 1500,
          key: 'milestone',
        });
        setTimeout(() => {
          this.myRouter.navigateByUrl(
            '/client/ProjectPost/' +
              this.milestone.projectPostId +
              '/Milestone/GetAll'
          );
        }, 1500);
      },
      error: (err) => {
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
}
