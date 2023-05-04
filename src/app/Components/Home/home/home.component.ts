import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CreateProjectPost } from 'src/app/Models/ProjectPost/create-projectpost';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { ProjectPostService } from 'src/app/Services/project-post.service';
import { LookupValueService } from 'src/app/Services/LookupValues_Service/lookup-value.service';
import { Freelancer } from 'src/app/Models/Freelancer/freelancer';
import { StaticHelper } from 'src/app/Helpers/static-helper';
import { ClientService } from 'src/app/Services/client.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Projects: { averagePrice: number, categoryId: number, description: string, id: number, postTitle: string, projectPostDate: Date, location: string, category_name: string }[] = [];
  AllProjects: { averagePrice: number, categoryId: number, description: string, id: number, postTitle: string, projectPostDate: Date, location: string }[] = [];
  Freelancers: Freelancer[] = [];
  AllFreeLancers: Freelancer[] = [];
  cat: any;
  clientCount: number = 0;
  TasksCount: number = 0;
  FreeLancerCount: number = 0;
  CategoryIds: number[] = [];
  FreelancersbyCatCount: number[] = [];
  joindata: { averagePrice: number, categoryId: number, description: string, id: number, postTitle: string, projectPostDate: Date, location: string, category_name: string }[] = [];
  Categories: { valueId: number, valueName: string, lookupId: number }[] = [];
  constructor(public translate: TranslateService, private myService: ProjectPostService, private LookService: LookupValueService, private FLService: FreelancerService, private Clientservice: ClientService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
  ngOnInit(): void {
    //get Clients Counts For counter in Welcome photo
    this.Clientservice.GetClientCount().subscribe({
      next: (data: any) => {
        // console.log(data.clientCount);
        this.clientCount = data.clientCount;
      },
      error: (err) => {
        console.log(err);
      },
    });



    //Get Freelancers Count for welcome part and
    // Get highest rated freelancers
    this.FLService.GetAllFreelancers().subscribe({
      next: (data: any) => {
        console.log(data.body);
        this.AllFreeLancers = data.body;
        this.FreeLancerCount = this.AllFreeLancers.length;
        // console.log(this.FreeLancerCount)
        for (let i = 0; i < data.body.length; i++) {
          if (data.body[i].rank == 5) {
            var freelancerTemp = data.body[i];
            if (freelancerTemp.image != null)
              freelancerTemp.image = StaticHelper.ConvertByteArrayToImage(data.body[i].image);
            freelancerTemp.cv = StaticHelper.ConvertByteArrayToPdf(data.body[i].cv);
            this.Freelancers.push(freelancerTemp);
          }
        }
        // console.log(this.Freelancers);
      },
      error: (error) => {

      },
    })

    //Get array Of category Ids to Get FreelancerCounts in them
    this.LookService.GetAllLookupvalueByLookuptableName("Category").subscribe({
      next: (data: any) => {
        this.Categories = data;
        console.log(this.Categories);
        for (let i = 0; i < data.length; i++) {
          this.CategoryIds.push(data[i].valueId);
        }
        console.log(this.CategoryIds);
        this.counts();
        //Get recent tasks section  
        //Get thier count for counter in welcome photo section
        this.myService.GetAllProjectPosts().subscribe(
          {
            next: (data: any) => {
              this.TasksCount = data.length;
              this.AllProjects = data;
              this.joindata = this.AllProjects.map((d) => {
                let category = this.Categories.find(c => c.valueId === d.categoryId);
                let categoryName = category ? category.valueName : '';

                return {
                  ...d,
                  category_name: categoryName
                };
              })
              console.log(this.joindata.sort(this.compareByDate));
              this.Projects = this.joindata.slice(0, 3);

              console.log(this.TasksCount);
              console.log(this.Projects);
            },
            error: (error) => {

            },
          }
        );
      },
      error: (err) => {
        console.log(err);
      },
    })

  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
  private counts() {
    this.FLService.GetCounts({ CatIds: this.CategoryIds }).subscribe({
      next: (data: any) => {

        console.log(data.counts);
        this.FreelancersbyCatCount = data.counts;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }
  private compareByDate(a: any, b: any): number {
    let dateA = new Date(a.projectPostDate);
    let dateB = new Date(b.projectPostDate);
    if (dateA < dateB) {
      return 1;
    }
    if (dateA > dateB) {
      return -1;
    }
    return 0;
  }
}

