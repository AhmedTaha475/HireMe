import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/app/Services/Transaction_Service/transaction.service';
import { FreelancerService } from 'src/app/Services/freelancer.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  constructor(public MyTransactionservice:TransactionService,public myActiveRoute:ActivatedRoute,
    public freelancer:FreelancerService,)
    {
      
    }
  transaction:any;
  
  ngOnInit(): void {
    this.MyTransactionservice.GetAllTranscationsByUserId().subscribe({
      next:(data:any)=>{this.transaction=data},
      error:()=>{}
    })
}
}
