import { Component, OnInit } from '@angular/core';
import { ProjectPostService } from 'src/app/Services/project-post.service';

@Component({
  selector: 'app-managa-project-posts',
  templateUrl: './managa-project-posts.component.html',
  styleUrls: ['./managa-project-posts.component.css'],
})
export class ManagaProjectPostsComponent implements OnInit {
  constructor(private projectpostServ: ProjectPostService) {}

  ngOnInit(): void {
    this.projectpostServ.GetAllProjectPosts();
  }
}
