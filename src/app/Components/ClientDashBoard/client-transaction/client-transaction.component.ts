import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/Services/Transaction_Service/transaction.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-client-transaction',
  templateUrl: './client-transaction.component.html',
  styleUrls: ['./client-transaction.component.css'],
})
export class ClientTransactionComponent implements OnInit {
  transactions: any[] = [];
  isLoaded: boolean = false;
  constructor(private transactionServ: TransactionService,public translate: TranslateService) {
    translate.setDefaultLang('en');
    const langItem = localStorage.getItem('Lang');
    if (langItem !== null) {
      translate.use(langItem);
    }
  }
  ngOnInit(): void {
    this.transactionServ.GetAllTranscationsByUserId().subscribe({
      next: (data: any) => {
        this.transactions = data;
        console.log(this.transactions)
        this.isLoaded = true;

      },
      error: (err: any) => {
        console.log(err);
        this.isLoaded=true;
      },
    });
  }
}
