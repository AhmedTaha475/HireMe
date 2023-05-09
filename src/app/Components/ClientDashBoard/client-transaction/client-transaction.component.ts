import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/Services/Transaction_Service/transaction.service';

@Component({
  selector: 'app-client-transaction',
  templateUrl: './client-transaction.component.html',
  styleUrls: ['./client-transaction.component.css'],
})
export class ClientTransactionComponent implements OnInit {
  transactions: any[] = [];
  constructor(private transactionServ: TransactionService) {}
  ngOnInit(): void {
    this.transactionServ.GetAllTranscationsByUserId().subscribe({
      next: (data: any) => {
        console.log(data);
        this.transactions = data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
