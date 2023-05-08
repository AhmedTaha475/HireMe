import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { ProjectPostApplicantsService } from 'src/app/Services/project-post-applicants.service';
import { ProjectPostService } from 'src/app/Services/project-post.service';

@Component({
  selector: 'app-post-applicants',
  templateUrl: './post-applicants.component.html',
  styleUrls: ['./post-applicants.component.css'],
})
export class PostApplicantsComponent implements OnInit {
  projectPostid: number | any = null;
  PostApplicants: any[] = [];
  Freelancers: any[] = [];
  ApplicantsWithFreelancerData: any[] = [];
  DetailsDialogVisible: boolean = false;
  CurrentProposal: any;
  currentProjectPost: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private applicantsServ: ProjectPostApplicantsService,
    private freelancerServ: FreelancerService,
    private projectpostSer: ProjectPostService,
    private messageService: MessageService
  ) {
    this.projectPostid = this.activatedRoute.snapshot.params['id'];
    console.log(this.projectPostid);
  }
  ngOnInit(): void {
    this.GetAllApplicants();
  }

  private GetAllApplicants() {
    this.applicantsServ.GetAllByProjectPostById(this.projectPostid).subscribe({
      next: (data: any) => {
        console.log(data);
        this.PostApplicants = data;
        this.GetAllFreelancers();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  private GetAllFreelancers() {
    this.freelancerServ.GetAllFreelancers().subscribe({
      next: (data: any) => {
        this.Freelancers = data.body;
        console.log(data);
        this.ApplicantsWithFreelancerData = this.PostApplicants.map(
          (PostApplicant) => {
            const item = this.Freelancers.find(
              (freelancer) => freelancer.id == PostApplicant.freelancerId
            );

            return {
              ...PostApplicant,
              firstname: item.firstname,
              lastname: item.lastname,
              phonenumber: item.phonenumber,
              email: item.email,
              image: item.image,
              rank: item.rank,
            };
          }
        );
        console.log(this.ApplicantsWithFreelancerData);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  private GetCurrentProjectPostAndUpdate() {
    this.projectpostSer.GetProjectPostById(this.projectPostid).subscribe({
      next: (data: any) => {
        console.log(data);
        this.currentProjectPost = data;
        this.currentProjectPost.approved = true;
        this.projectpostSer
          .UpdateProjectPost(this.projectPostid, this.currentProjectPost)
          .subscribe({
            next: (data2: any) => {
              console.log(data2);
            },
            error: (err2: any) => console.log(err2),
          });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  ApproveApplicant(id: number, freelancerId: string) {
    var applicantToBeUpdated = this.PostApplicants.filter(
      (el: any) => el.pP_ID == id && el.freelancerId == freelancerId
    )[0];
    console.log(applicantToBeUpdated);
    applicantToBeUpdated.approved = true;
    this.applicantsServ
      .UpdateProjectPostApplicant(applicantToBeUpdated, id)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.GetCurrentProjectPostAndUpdate();
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: 'Approved',
            detail: 'Application approved successfully',
            life: 1500,
            key: 'approve',
          });
        },
        error: (err: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong',
            life: 1500,
            key: 'approve',
          });
        },
      });
  }
  OpenDetails(proposal: string) {
    this.CurrentProposal = proposal;
    this.DetailsDialogVisible = true;
  }
}
