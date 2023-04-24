import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectPostService } from 'src/app/Services/project-post.service';
import { CreateProjectPost } from 'src/app/Models/ProjectPost/create-projectpost';

@Component({
  selector: 'app-project-post',
  templateUrl: './create-project-post.component.html',
  styleUrls: ['./create-project-post.component.css']
})
export class CreateProjectPostComponent {

  constructor(private projectPostService: ProjectPostService, private router: Router) { }
  addProjectPost(
    postTitle:string,
    description:string,
    averagePrice :number,
    categoryId :number
  ){
    // let projectPost = {
    //   postTitle,
    //   description,
    //   averagePrice,
    //   categoryId
    // }
    let projectPost = new CreateProjectPost(
            postTitle,
            description,
            averagePrice,
            categoryId
    )
    this.projectPostService.CreateProjectPost(projectPost).subscribe({
      next: (data)=>{
        console.log("Added");
      },
      error: (err)=>{}
    });
  }
}
