import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LookupValueService } from 'src/app/Services/LookupValues_Service/lookup-value.service';
import { ProjectPostService } from 'src/app/Services/project-post.service';

@Component({
  selector: 'app-managa-project-posts',
  templateUrl: './managa-project-posts.component.html',
  styleUrls: ['./managa-project-posts.component.css'],
})
export class ManagaProjectPostsComponent implements OnInit {
  updatePost = new FormGroup({
    postTitle: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
    ]),
    averagePrice: new FormControl(null, [Validators.required]),
    categoryId: new FormControl(0),
    location: new FormControl(null, [Validators.required]),
  });

  constructor(
    private projectpostServ: ProjectPostService,
    private lookupvaluesServ: LookupValueService
  ) {}
  projectPosts: any[] = [];
  categories: any;
  UpdateDialogVisible: boolean = false;
  currentProjectPost: any;
  ngOnInit(): void {
    this.GetallClientPosts();
    this.GetAllCategories();
  }

  confirmUpdate() {
    this.UpdateDialogVisible = false;
    let currentPost: { [key: string]: any } = {};
    for (let controlName in this.updatePost.controls) {
      currentPost[controlName] = this.updatePost.get(controlName)?.value;
    }
    currentPost['projectPostDate'] = this.currentProjectPost.projectPostDate;
    currentPost['done'] = this.currentProjectPost.done;
    this.projectpostServ
      .UpdateProjectPost(this.currentProjectPost.id, currentPost)
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.GetallClientPosts();
        },
        error: (err: any) => {},
      });
  }
  UpdateProjectPost(id: number) {
    this.UpdateDialogVisible = true;
    this.projectpostServ.GetProjectPostById(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.currentProjectPost = data;
        for (let controlName in this.updatePost.controls) {
          this.updatePost.get(controlName)?.setValue(data[controlName]);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  private GetAllCategories() {
    this.lookupvaluesServ
      .GetAllLookupvalueByLookuptableName('Category')
      .subscribe({
        next: (data: any) => {
          this.categories = data;
        },
        error: (err: any) => console.log(err),
      });
  }
  private GetallClientPosts() {
    // this.projectPosts = [];
    this.projectpostServ.GetAllProjectPostsByCurrentClient().subscribe({
      next: (data: any) => {
        console.log(data);
        this.projectPosts = data;
      },
    });
  }
}
