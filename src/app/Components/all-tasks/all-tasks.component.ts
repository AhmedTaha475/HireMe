import { Component, OnInit } from '@angular/core';
import { LookupValueService } from 'src/app/Services/LookupValues_Service/lookup-value.service';
import { ProjectPostService } from 'src/app/Services/project-post.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit{
  AllProjects: { averagePrice: number, categoryId: number, description: string, id: number, postTitle: string, projectPostDate: Date, location: string ,done:boolean}[] = [];
  joindata: { averagePrice: number, categoryId: number, description: string, id: number, postTitle: string, projectPostDate: Date, location: string, category_name: string ,done:boolean}[] = [];
  Projects: { averagePrice: number, categoryId: number, description: string, id: number, postTitle: string, projectPostDate: Date, location: string, category_name: string ,done:boolean}[] = [];
  Categories: { valueId: number, valueName: string, lookupId: number }[] = [];

  constructor(private myService: ProjectPostService,private LookService: LookupValueService){
}
  ngOnInit(): void {
    this.LookService.GetAllLookupvalueByLookuptableName("Category").subscribe({
      next: (data: any) => {
        this.Categories = data;
        console.log(this.Categories);
        //Get recent tasks section  
        //Get thier count for counter in welcome photo section
        this.myService.GetAllProjectPosts().subscribe(
          {
            next: (data: any) => {
              this.AllProjects = data;
              this.joindata = this.AllProjects.map((d) => {
                d.description = d.description.slice(0,100);
                let category = this.Categories.find(c => c.valueId === d.categoryId);
                let categoryName = category ? category.valueName : '';

                return {
                  ...d,
                  category_name: categoryName
                };
              })
             this.joindata.sort(this.compareByDate);
              //this.Projects = this.joindata.slice(0, 3);

              console.log(this.joindata);
              for(let i =0;i<this.joindata.length;i++){
                if(this.joindata[i].done != true){
                  this.Projects.push(this.joindata[i]);
                }
              }
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
