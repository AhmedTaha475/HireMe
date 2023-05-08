import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddClientReview } from 'src/app/Models/ProjectReview/add-client-review';
import { ClientService } from 'src/app/Services/client.service';
import { ProjectReviewService } from 'src/app/Services/project-review.service';

@Component({
  selector: 'app-add-client-review',
  templateUrl: './add-client-review.component.html',
  styleUrls: ['./add-client-review.component.css']
})
export class AddClientReviewComponent implements OnInit {
  projectPostId:any;
  clientId:any;
  addClientReview = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    stars: new FormControl('', [
      Validators.required,
      Validators.max(5)
    ])
  })
  constructor(
    private myRoute: ActivatedRoute,
    private myRouter: Router,
    private reviewService: ProjectReviewService,
    private clientService: ClientService
  ){
    this.projectPostId = myRoute.snapshot.params["id"];
  }
  ngOnInit(): void {
    this.clientService.GetCurrentClient().subscribe({
      next:(data:any)=>{
        this.clientId = data.body.id
      }
    })
  }
confirmAdd(){
  let clientReviewData = new AddClientReview(
    this.clientId,
    this.projectPostId,
    this.addClientReview.get('review')?.value || '',
    Number(this.addClientReview.get('stars')?.value) || 0
    ); 
    console.log(clientReviewData)
    this.reviewService.AddClientReview(clientReviewData).subscribe({
      next:(data)=>{
        console.log("added")
        //this.myRouter.navigateByUrl('/ProjectPost/'+this.projectPostId+'/Milestone/GetAll')
      },
      error:(err)=>{console.log(err)}
    })
}
}
