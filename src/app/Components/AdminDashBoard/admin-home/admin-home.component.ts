import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/Services/client.service';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { ProjectPostApplicantsService } from 'src/app/Services/project-post-applicants.service';
import { ProjectPostService } from 'src/app/Services/project-post.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  allfreelancers: any[] = [];
  FreelancersCount: number | null = null;
  allClients: any[] = [];
  ClientsCount: number | null = null;
  allProjectPosts: any[] = [];
  ProjectPostCount: number | null = null;
  allProjectpostApplicants: any[] = [];
  ApplicantsCount: number | null = null;
  planSubscripers: any[] = [];
  subscCount: number | null = null;
  basicData: any;
  basicOptions: any;
  constructor(
    private _freelancerServ: FreelancerService,
    private _clientServ: ClientService,
    private _projectPostServ: ProjectPostService,
    private ProjectPostApp: ProjectPostApplicantsService
  ) {}
  ngOnInit(): void {
    this.GetFreelancers();
    this.GetClients();
    this.GetProjectPosts();
    this.GetAllApplicants();

    this.chart1();
  }

  private GetFreelancers() {
    this._freelancerServ.GetAllFreelancers().subscribe({
      next: (data: any) => {
        this.allfreelancers = data.body;
        this.FreelancersCount = this.allfreelancers.length;
        this.GetPlanSubscribers();
      },
      error: (err: any) => {},
    });
  }
  private GetClients() {
    this._clientServ.GetAllClients().subscribe({
      next: (data: any) => {
        this.allClients = data.body;
        this.ClientsCount = data.body.length;
      },
    });
  }

  private GetProjectPosts() {
    this._projectPostServ.GetAllProjectPosts().subscribe({
      next: (data: any) => {
        this.allProjectPosts = data;
        this.ProjectPostCount = data.length;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  private GetAllApplicants() {
    this.ProjectPostApp.GetAll().subscribe({
      next: (data: any) => {
        this.allProjectpostApplicants = data;
        this.ApplicantsCount = data.length;
      },
    });
  }

  private GetPlanSubscribers() {
    this.planSubscripers = this.allfreelancers.filter((el: any) => {
      return el.planId != null;
    });
    this.subscCount = this.planSubscripers.length;
    console.log('here');
    console.log(this.allfreelancers);
    console.log(this.planSubscripers);
  }
  private chart1() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Sales',
          data: [540, 325, 702, 620],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 1,
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
