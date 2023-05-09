import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
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
    private lookupvaluesServ: LookupValueService,
    private messageService: MessageService
  ) {}
  projectPosts: any[] = [];
  categories: any;
  UpdateDialogVisible: boolean = false;
  currentProjectPost: any;
  DeleteDialogVisible: boolean = false;
  postToBeDeleted: any;
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
          this.messageService.clear();
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Job Updated Successfully',
            life: 1500,
            key: 'updatePost',
          });
        },
        error: (err: any) => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Somethign went wrong......',
            life: 1500,
            key: 'updatePost',
          });
        },
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

  ConfirmDelete() {
    this.projectpostServ.DeleteProjectPost(this.postToBeDeleted).subscribe({
      next: (data: any) => {
        this.GetallClientPosts();
        this.DeleteDialogVisible = false;
        this.messageService.clear();
        this.messageService.add({
          severity: 'warn',
          summary: 'Deleted',
          detail: 'Record Deteled successfully',
          life: 1500,
          key: 'DeletePost',
        });
      },
      error: (err: any) => {
        this.messageService.clear();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Somethign went wrong......',
          life: 1500,
          key: 'DeletePost',
        });
      },
    });
  }
  proceedToDelete(id: number) {
    this.postToBeDeleted = id;
    this.DeleteDialogVisible = true;
  }

  EndProject(id: number) {
    this.projectpostServ.GetProjectPostById(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.currentProjectPost = data;
        this.currentProjectPost.done = true;
        this.projectpostServ
          .UpdateProjectPost(id, this.currentProjectPost)
          .subscribe({
            next: (data: any) => {
              console.log(data);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
