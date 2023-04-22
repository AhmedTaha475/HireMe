import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectPostService } from 'src/app/Services/project-post.service';

@Component({
  selector: 'app-all-project-posts',
  templateUrl: './all-project-posts.component.html',
  styleUrls: ['./all-project-posts.component.css']
})
export class AllProjectPostsComponent implements OnInit {
  projectPosts:any;
  constructor(private projectPostService: ProjectPostService, private router: Router) { }
  ngOnInit(): void {
    this.projectPostService.GetAllProjectPosts().subscribe({
      next:(data)=>{this.projectPosts = data},
      error:(err)=>{console.log(err)}
    })
  }
  
}
