import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateFreelancertMoney } from 'src/app/Models/Freelancer/update-freelancert-money';
import { CreateTransaction } from 'src/app/Models/Transaction/Create-Transaction';
import { TransactionService } from 'src/app/Services/Transaction_Service/transaction.service';
import { ClientService } from 'src/app/Services/client.service';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { MilestoneService } from 'src/app/Services/milestone.service';
import { ProjectPostApplicantsService } from 'src/app/Services/project-post-applicants.service';
import { ProjectPostService } from 'src/app/Services/project-post.service';

@Component({
  selector: 'app-project-post-milestones',
  templateUrl: './project-post-milestones.component.html',
  styleUrls: ['./project-post-milestones.component.css'],
})
export class ProjectPostMilestonesComponent implements OnInit {
  projectPostId: any;
  milestones: any;
  currentMilestone: any;
  ApplicantsByProjectPost: any[] = [];
  currentProjectPost: any;
  currentClientId: any;
  constructor(
    private myRoute: ActivatedRoute,
    private myRouter: Router,
    private milestoneService: MilestoneService,
    private freelancerServ: FreelancerService,
    private projectPostApplicantServ: ProjectPostApplicantsService,
    private projectpostServ: ProjectPostService,
    private transactionServ: TransactionService,
    private clientServ: ClientService
  ) {
    this.projectPostId = myRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.milestoneService
      .GetMilestroneByProjectId(this.projectPostId)
      .subscribe({
        next: (data) => {
          this.milestones = data;
          console.log(data);
        },
        error: (err) => {},
      });

    this.GetCurrentProjectPost();
    this.GetCurrentClientId();
  }

  Release(id: number) {
    this.milestoneService.GetMilestoneById(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.currentMilestone = data;
        var updatedobject = data;
        updatedobject.released = true;
        this.updateMilestone(id, updatedobject);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  private GetCurrentClientId() {
    this.clientServ.GetCurrentClient().subscribe({
      next: (data: any) => {
        this.currentClientId = data.body.id;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  private updateMilestone(id: number, updateMilestone: any) {
    this.milestoneService.UpdateMilestone(id, updateMilestone).subscribe({
      next: (data: any) => {
        console.log(data);
        this.GetApplicants();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  private GetApplicants() {
    this.projectPostApplicantServ
      .GetAllByProjectPostById(this.projectPostId)
      .subscribe({
        next: (data: any) => {
          var freelancerId = data.filter((el: any) => el.approved == true)[0]
            .freelancerId;
          this.freelancerServ
            .UpdateFreelancerMoneyById(
              new UpdateFreelancertMoney(
                null,
                null,
                this.currentMilestone.value,
                null,
                this.currentMilestone.value
              ),
              freelancerId
            )
            .subscribe({
              next: (data: any) => {
                console.log(data);
                this.addNewTranscation(freelancerId);
              },
              error: (err: any) => {
                console.log(err);
              },
            });
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  private GetCurrentProjectPost() {
    this.projectpostServ.GetProjectPostById(this.projectPostId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.currentProjectPost = data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  private addNewTranscation(freelancerId: string) {
    this.transactionServ
      .CreateNewTransaction(
        freelancerId,
        new CreateTransaction(
          new Date(),
          this.currentMilestone.value,
          `You have recieved the money : ${this.currentMilestone.value} for the Milestone ${this.currentMilestone.name} `
        )
      )
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.addNewTranscationForClient(this.currentClientId);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
  private addNewTranscationForClient(clientId: string) {
    this.transactionServ
      .CreateNewTransaction(
        clientId,
        new CreateTransaction(
          new Date(),
          this.currentMilestone.value,
          `You have Deposited the money : ${this.currentMilestone.value} for the Milestone ${this.currentMilestone.name} `
        )
      )
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.myRouter.navigateByUrl('/client/managejob');
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
}
