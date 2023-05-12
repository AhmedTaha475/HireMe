import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectPostWithApplicants } from 'src/app/Models/ProjectPost/get-projectpost-with-applicants';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { ProjectPostService } from 'src/app/Services/project-post.service';

@Component({
  selector: 'app-project-post',
  templateUrl: './project-post.component.html',
  styleUrls: ['./project-post.component.css'],
})
export class ProjectPostComponent implements OnInit {
  projectPostId: any;
  freelancerArr: any[] = [];
  projectPost: any;
  projectPost2: any;
  applicant: any;
  applicantAllData: any;
  freelancer: any;
  freelancerId: any;
  applied: any;
  projectpostapplicants: any[] = [];
  projectPostWithapplicantsData: any[] = [];
  allfreelancers: any[] = [];
  constructor(
    private myActivated: ActivatedRoute,
    private projectPostService: ProjectPostService,
    private freelancerService: FreelancerService
  ) {
    this.projectPostId = myActivated.snapshot.params['id'];
  }

  /*

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
  */
  ngOnInit(): void {
    //#region  Get Current Freelancer
    this.freelancerService.GetCurrentFreelancer().subscribe({
      next: (data: any) => {
        this.freelancer = data.body;
        this.freelancerId = this.freelancer.id;
        console.log(this.freelancerId);
        this.applyFunction();
      },
      error: (err) => {},
    });
    //#endregion

    console.log(this.freelancerArr);
  }

  private getAllFreelancers() {
    this.freelancerService.GetAllFreelancers().subscribe({
      next: (data: any) => {
        console.log(data);
        this.allfreelancers = data.body;
        this.projectPostWithapplicantsData = this.projectpostapplicants.map(
          (applicant: any) => {
            const freelancer = this.allfreelancers.find(
              (freelancer: any) => freelancer.id == applicant.freelancerId
            );

            return { ...applicant, ...freelancer };
          }
        );
      },
    });
  }

  private applyFunction() {
    this.projectPostService
      .GetProjectPostWithApplicants(this.projectPostId)
      .subscribe({
        next: (data: any) => {
          this.projectPost = data;
          console.log(this.projectPost);
          this.projectpostapplicants = data.projectPostApplicants;
          this.getAllFreelancers();
          var freelancerExists = this.projectpostapplicants.filter(
            (el: any) => {
              return el.freelancerId == this.freelancerId;
            }
          );
          console.log(freelancerExists);
          if (freelancerExists) this.applied = true;
          else this.applied = false;
        },

        error: (err) => {
          console.log(err);
        },
      });
  }
}
