import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/app/Services/Transaction_Service/transaction.service';
import { FreelancerService } from 'src/app/Services/freelancer.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  constructor(
    public MyTransactionservice: TransactionService,
    public myActiveRoute: ActivatedRoute,
    public freelancer: FreelancerService,
    public datapipe: DatePipe
  ) {}
  transaction: any;
  transactiondate: any;

  transformData(data: any[]): any[] {
    return data.map((item) => {
      const formattedDate = this.datapipe.transform(
        item.dateOfTransaction,
        'yyyy-MM-dd'
      );
      return {
        id: item.id,
        dateOfTransaction: formattedDate,
        amount: item.amount,
        description: item.description,
      };
    });
  }

  ngOnInit(): void {
    this.MyTransactionservice.GetAllTranscationsByUserId().subscribe({
      next: (data: any) => {
        this.transaction = this.transaction = this.transformData(data);
        console.log(this.transaction);
      },
      error: () => {},
    });
  }
}
