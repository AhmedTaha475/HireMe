import { Component, OnInit } from '@angular/core';
import { LookupValueService } from 'src/app/Services/LookupValues_Service/lookup-value.service';
import { PlanService } from 'src/app/Services/Plan_Service/plan.service';
import { ClientService } from 'src/app/Services/client.service';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { ProjectPostApplicantsService } from 'src/app/Services/project-post-applicants.service';
import { ProjectPostService } from 'src/app/Services/project-post.service';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  //#region Variables

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

  allplan: any[] = [];

  allCategories: any[] = [];

  allProjects: any[] = [];
  systemProjectCount: number | null = null;

  basicData: any;
  basicOptions: any;

  PieCLFL: any;
  PieOptionsCLFL: any;

  CatData: any;
  CatOption: any;

  RankData: any;
  RankOption: any;

  PieChart2Data: any;
  PieChart2Ooptions: any;
  //#endregion
  constructor(
    private _freelancerServ: FreelancerService,
    private _clientServ: ClientService,
    private _projectPostServ: ProjectPostService,
    private ProjectPostApp: ProjectPostApplicantsService,
    private ProjectServ: ProjectService,
    private freelancers: FreelancerService,
    private planServ: PlanService,
    private lookupValuesServ: LookupValueService
  ) {}
  ngOnInit(): void {
    this.GetFreelancers();
    this.GetClients();
    this.GetProjectPosts();
    this.GetAllApplicants();
    this.GetAllSystemProjects();
  }

  //#region DataGathering

  private GetFreelancers() {
    this._freelancerServ.GetAllFreelancers().subscribe({
      next: (data: any) => {
        this.allfreelancers = data.body;
        console.log(this.allfreelancers);
        this.FreelancersCount = this.allfreelancers.length;
        this.GetPlanSubscribers();
        this.CLFLPieChart();
        this.GetAllPlans();
        this.GetAllCategories();
        this.FreelancerRanks();
      },
      error: (err: any) => {},
    });
  }
  private GetClients() {
    this._clientServ.GetAllClients().subscribe({
      next: (data: any) => {
        this.allClients = data.body;
        this.ClientsCount = data.body.length;
        this.CLFLPieChart();
      },
    });
  }

  private GetProjectPosts() {
    this._projectPostServ.GetAllProjectPosts().subscribe({
      next: (data: any) => {
        this.allProjectPosts = data;
        this.ProjectPostCount = data.length;
        this.PP_PA_PD_PieChart();
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
        this.PP_PA_PD_PieChart();
      },
    });
  }
  private GetAllPlans() {
    this.planServ.GetAllPlans().subscribe({
      next: (data: any) => {
        console.log(data);
        this.allplan = data;
        this.PlanSubsriberChart();
      },
      error: (er: any) => {
        console.log(er);
      },
    });
  }
  private GetPlanSubscribers() {
    this.planSubscripers = this.allfreelancers.filter((el: any) => {
      return el.planId != null;
    });
    this.subscCount = this.planSubscripers.length;
    console.log('here');
  }

  private GetAllSystemProjects() {
    this.ProjectServ.GetAll().subscribe({
      next: (data: any) => {
        this.allProjects = data;
        this.systemProjectCount = this.allProjects.filter(
          (c) => c.systemProject == true
        ).length;
        this.PP_PA_PD_PieChart();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private GetAllCategories() {
    this.lookupValuesServ
      .GetAllLookupvalueByLookuptableName('Category')
      .subscribe({
        next: (data: any) => {
          this.allCategories = data;
          this.UsersPerCategory();
        },
      });
  }
  //#endregion
  //#region Charts

  private PlanSubsriberChart() {
    var planNames: string[] = this.allplan.map((plan) => plan.name);
    var numberOfFreelancerPerPlan = this.allplan.map((plan) => {
      const count = this.allfreelancers.filter(
        (f) => f.planId == plan.id
      ).length;
      return count;
    });
    console.log(numberOfFreelancerPerPlan);

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: planNames,
      datasets: [
        {
          label: 'Number of subscribers per plan',
          data: numberOfFreelancerPerPlan,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(50, 102, 255, 0.2)',
            'rgba(90, 200, 255, 0.2)',
            'rgba(50, 40, 255, 0.2)',
            'rgba(90, 90, 255, 0.2)',
            'rgba(130, 10, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 5,
        },
      ],
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: 'red',
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'blue',
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: 'red',
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  private UsersPerCategory() {
    var CategoryName = this.allCategories.map((cat) => cat.valueName);
    var NumberOffreelancersPerCategory = this.allCategories.map((cat) => {
      const count = this.allfreelancers.filter(
        (el) => el.categoryId == cat.valueId
      ).length;
      return count;
    });
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.CatData = {
      labels: CategoryName,
      datasets: [
        {
          label: 'Number of Freelancers per Category',
          data: NumberOffreelancersPerCategory,
          backgroundColor: [
            'rgba(1, 159, 64, 0.2)',
            'rgba(75, 2, 192, 0.2)',
            'rgba(54, 96, 5, 0.2)',
            'rgba(255, 102, 255, 0.2)',
            'rgba(90, 200, 3, 0.2)',
            'rgba(50, 40, 255, 0.2)',
            'rgba(90, 5, 255, 0.2)',
            'rgba(130, 10, 255, 0.2)',
          ],
          borderColor: [
            'rgba(1, 159, 64)',
            'rgba(75, 2, 192)',
            'rgba(54, 96, 5)',
            'rgba(255, 102, 255)',
            'rgba(90, 200, 3)',
            'rgba(50, 40, 255)',
            'rgba(90, 5, 255)',
            'rgba(130, 10, 255)',
          ],
          borderWidth: 5,
        },
      ],
    };

    this.CatOption = {
      plugins: {
        legend: {
          labels: {
            color: 'red',
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'blue',
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: 'red',
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  private FreelancerRanks() {
    var RankList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var RankNames = [
      'Rank0',
      'Rank1',
      'Rank2',
      'Rank3',
      'Rank4',
      'Rank5',
      'Rank6',
      'Rank7',
      'Rank8',
      'Rank9',
      'Rank10',
    ];
    var NumberOffreelancersPerRank = RankList.map((rank) => {
      const count = this.allfreelancers.filter((el) => el.rank == rank).length;
      return count;
    });
    console.log(RankList);
    console.log(NumberOffreelancersPerRank);
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.RankData = {
      labels: RankNames,
      datasets: [
        {
          type: 'line',
          tension: 0.4,
          label: 'Freelancer Ranks Distruibution',
          data: NumberOffreelancersPerRank,
          backgroundColor: [
            'rgba(10, 10, 10, 0.2)',
            'rgba(75, 2, 192, 0.2)',
            'rgba(54, 96, 5, 0.2)',
            'rgba(255, 102, 255, 0.2)',
            'rgba(90, 200, 3, 0.2)',
            'rgba(50, 40, 255, 0.2)',
            'rgba(90, 5, 255, 0.2)',
            'rgba(130, 10, 255, 0.2)',
          ],
          borderColor: [
            'rgba(90,210, 10)',
            'rgba(75, 2, 192)',
            'rgba(54, 96, 5)',
            'rgba(255, 102, 255)',
            'rgba(90, 200, 3)',
            'rgba(50, 40, 255)',
            'rgba(90, 5, 255)',
            'rgba(130, 10, 255)',
          ],
          borderWidth: 2,
        },
      ],
    };

    this.RankOption = {
      plugins: {
        legend: {
          labels: {
            color: 'red',
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'blue',
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: 'red',
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  private CLFLPieChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.PieCLFL = {
      labels: ['Clients', 'Freelancers'],
      datasets: [
        {
          data: [this.ClientsCount, this.FreelancersCount],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };

    this.PieOptionsCLFL = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
  }

  private PP_PA_PD_PieChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.PieChart2Data = {
      labels: ['Jobs', 'Applicants', 'Jobs Finished'],
      datasets: [
        {
          data: [
            this.ProjectPostCount,
            this.ApplicantsCount,
            this.systemProjectCount,
          ],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };

    this.PieChart2Ooptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
  }

  //#endregion
}
