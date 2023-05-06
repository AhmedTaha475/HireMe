import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectPostService } from 'src/app/Services/project-post.service';
import { CreateProjectPost } from 'src/app/Models/ProjectPost/create-projectpost';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LookupValueService } from 'src/app/Services/LookupValues_Service/lookup-value.service';
import { LookupTableService } from 'src/app/Services/LookupTable_Service/lookup-table.service';

@Component({
  selector: 'app-project-post',
  templateUrl: './create-project-post.component.html',
  styleUrls: ['./create-project-post.component.css'],
})
export class CreateProjectPostComponent implements OnInit {
  createProjectPost = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
    ]),
    price: new FormControl(null, [Validators.required]),
    categoryId: new FormControl(0),
    location: new FormControl(null, [Validators.required]),
  });
  categories: any;
  constructor(
    private projectPostService: ProjectPostService,
    private router: Router,
    private lookupTable: LookupTableService,
    private lookupValue: LookupValueService
  ) {}
  ngOnInit(): void {
    this.lookupTable.GetAllLookupTables().subscribe({
      next: (data) => {
        const lookups = Object.values(data);
        lookups.forEach((lookup: any) => {
          if (lookup.lookupName == 'Category') {
            this.lookupValue
              .GetAllLookupvalueByLookuptableId(lookup.lookupId)
              .subscribe({
                next: (data) => {
                  this.categories = data;
                  console.log(this.categories);
                },
                error: (err) => {},
              });
          }
          //console.log(lookup.lookupName+" ")
        });
        //console.log(this.categories);
      },
      error: (err) => {},
    });
  }
  addProjectPost() {
    var catId = this.createProjectPost.get('categoryId')?.value || 0;
    console.log(catId);
    if (this.createProjectPost.valid) {
      let projectPost = {
        postTitle: this.createProjectPost.get('title')?.value || '',
        description: this.createProjectPost.get('description')?.value || '',
        averagePrice: this.createProjectPost.get('price')?.value || 0,
        projectPostDate: new Date(),
        categoryId: Number(catId),
        done: false,
        location: this.createProjectPost.get('location')?.value || '',
      };
      console.log(projectPost);
      this.projectPostService.CreateProjectPost(projectPost).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (err: any) => console.log(err),
      });
    }
  }
}
