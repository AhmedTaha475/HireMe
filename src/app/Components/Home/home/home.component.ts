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
  Projects: {averagePrice:number,categoryId:number,description:string,id:number,postTitle:string,projectPostDate:string}[] = [];
  Freelancers: Freelancer[] = [];
  AllFreeLancers: Freelancer[] = [];
  cat: any;
  clientCount: number = 0;
  TasksCount: number = 0;
  FreeLancerCount: number = 0;
  CategoryIds:number[]=[];
  FreelancersbyCatCount:number[]=[];
  constructor(public translate: TranslateService, private myService: ProjectPostService, private LookService: LookupValueService, private FLService: FreelancerService, private Clientservice: ClientService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
  ngOnInit(): void 
  {
    

    this.myService.GetAllProjectPosts().subscribe(
      {
        next: (data: any) => {
          this.Projects = data;
          this.TasksCount = this.Projects.length;
          console.log(this.TasksCount);
          console.log(this.Projects);
        },
        error: (error) => {

        },
      }
    );
    this.FLService.GetAllFreelancers().subscribe({
      next: (data: any) => {
        this.AllFreeLancers = data.body;
    this.FreeLancerCount = this.AllFreeLancers.length;
        console.log(this.FreeLancerCount)
        for (let i = 0; i < data.body.length; i++) {
          if (data.body[i].rank == 5) {
            var freelancerTemp = data.body[i];
            if (freelancerTemp.image != null)
              freelancerTemp.image = StaticHelper.ConvertByteArrayToImage(data.body[i].image);
            freelancerTemp.cv = StaticHelper.ConvertByteArrayToPdf(data.body[i].cv);
            this.Freelancers.push(freelancerTemp);
          }
        }
        console.log(this.Freelancers);
      },
      error: (error) => {

      },
    })
    this.LookService.GetAllLookupvalueByLookuptableName("Category").subscribe({
      next: (data: any) => {
        for(let i =0;i<data.length;i++){
          this.CategoryIds.push(data[i].valueId);
        }
        console.log(this.CategoryIds);
       for(let i=0;i<this.CategoryIds.length;i++){
let sum:number=0;
        for(let j=0;j<this.AllFreeLancers.length;j++){
          if (this.AllFreeLancers[j].categoryId==this.CategoryIds[i])
{
  sum ++;
}
        }
        this.FreelancersbyCatCount.push(sum);
       }
       console.log(this.FreelancersbyCatCount);
      },
      error: (err) => {
        console.log(err);
      },
    })
    //this.LookService.
    this.Clientservice.GetClientCount().subscribe({
      next: (data: any) => {
        console.log(data.clientCount);
        this.clientCount = data.clientCount;
      },
      error: (err) => {
        console.log(err);
      },
    })

    
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}

