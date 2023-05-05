import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StaticHelper } from 'src/app/Helpers/static-helper';
import { GetClient } from 'src/app/Models/Client/get-client';
import { Portfolio } from 'src/app/Models/Portfolio/Portfolio';
import { CreateProject } from 'src/app/Models/Project/create-project';
import { GetProjectById } from 'src/app/Models/Project/get-project-by-id';
import { PortfolioService } from 'src/app/Services/Portfolio_Service/portfolio.service';
import { ClientService } from 'src/app/Services/client.service';
import { FreelancerService } from 'src/app/Services/freelancer.service';
import { ProjectImageService } from 'src/app/Services/project-image.service';
import { ProjectPostService } from 'src/app/Services/project-post.service';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-freelancer-projects',
  templateUrl: './freelancer-projects.component.html',
  styleUrls: ['./freelancer-projects.component.css']
})
export class FreelancerProjectsComponent implements OnInit {
  id:any;
  myFreelancer:any ;
  ports:Portfolio[]=[] ;
  images:any ;
  myPort:any ;
  myProjects:GetProjectById[]=[];
  opened:boolean = false;
  sysProj:any =false  ;
    constructor(
      public myActiveRoute:ActivatedRoute,
      public freelancer:FreelancerService,
      public translate: TranslateService ,
      public port:PortfolioService,
      public projects:ProjectService,
      public clientServ:ClientService,
      public imageServ:ProjectImageService
      ) {
      this.id=myActiveRoute.snapshot.params["Id"]
      translate.setDefaultLang('en');
      translate.use('en');

    }
    switchLanguage(language: string) {
      this.translate.use(language);
    }
    ngOnInit(): void {
  this.port.GetAllPortfolio().subscribe(
    {

      next:(data:any)=>{  data.forEach((element:any) => {
        // console.log(element);
  this.ports.push(new Portfolio(element.portId,element.freelancerId))
      });}});


  // console.log(this.ports);
     this.freelancer.GetCurrentFreelancer().subscribe({
      next:(data:any)=>{this.myFreelancer=data.body;
        // this.myFreelancer.cv=StaticHelper.ConvertByteArrayToPdf(data.body.cv);
        // this.myFreelancer.image=StaticHelper.ConvertByteArrayToImage(data.body.image);
        this.myPort = this.ports.filter(p=>p.freelancerId==this.myFreelancer.id)[0] ;
        this.projects.GetProjectsByPortfolioId(this.myPort.portId).subscribe(
          {
          next:(mydata:any)=>{mydata.forEach((element:any) => {
  this.myProjects.push(new GetProjectById(element.p_id,element.title,element.description,new Date(element.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),element.systemproject,element.moneyearned))
    });
  console.log(this.myProjects);
  }
          }
        );
        },
      error:(err)=>{console.log(err)}
     })
    }

//      imageObject:Array<object> = [{
//       image: 'assets/css/BackgroundImages/3.jpg',
//       thumbImage: 'assets/css/BackgroundImages/3.jpg',
//       alt: 'alt of image',
//   }, {
//       image: 'assets/css/BackgroundImages/3.jpg', // Support base64 image
//       thumbImage: 'assets/css/BackgroundImages/3.jpg', // Support base64 image
//       alt: 'Image alt', //Optional: You can use this key if want to show image with alt
//   }
// ];
open()
{
  if(this.opened==false){
    this.opened = true;
  }
else this.opened=false;
}

GetImages(event: any) {
  this.images = event.target.files;
}

addNewProject(projectTitle:any , projectDate:any , moneyEarned:any ,projectDesc:any)
{
  let clientId:string = "fsdfd";
  let form = new FormData()
  form.append("title",projectTitle);
  form.append("description",projectDesc);
  form.append("Date",projectDate);
  form.append("SystemProject",this.sysProj);
  form.append("MoneyEarned",moneyEarned);
  form.append("PortfolioId",this.myPort.id);
  form.append("ClientId",clientId);
  form.append("ProjectImgs",this.images)

  // this.projects.CreateProject(form).subscribe({
  //   next:(data:any)=>console.log(data),

  // })
}


  }
