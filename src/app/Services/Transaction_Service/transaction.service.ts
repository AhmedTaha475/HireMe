import { Injectable } from '@angular/core';

// to use all methods of http requset in our service :
import { HttpClient } from '@angular/common/http';

// to get Base url : https://localhost:7047/api/ ---> we use StaticURL Class :
import { StaticURl } from 'src/app/Models/static-url';

// to use an oject of lookup table to use it in our html and anguler :
import { CreateTransaction } from 'src/app/Models/Transaction/Create-Transaction';

import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  //#region  Some Helpers Variables :

  Token: string = ' ';
  headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.Token}`,
  };
  options = { headers: this.headers };

  Url: any = StaticURl.URL + 'Transactions/';

  //#endregion
  constructor(private readonly myclient: HttpClient) {}

  //#region All Cruds of Transaction :

  // Get All Transactions by user id :   *** Need To check with ahmed taha ***
  GetAllTranscationsByUserId() {
    return this.myclient.get(
      this.Url + 'GetAllTranscationsByUserId',
      this.options
    );
  }

  // Get Transaction By its Id :
  GetTransactionById(transactionId: number) {
    return this.myclient.get(
      this.Url + 'GetTransactionById/' + transactionId,
      this.options
    );
  }

  // Create New Transaction :
  CreateNewTransaction(userId: string, newtransaction: CreateTransaction) {
    return this.myclient.post(
      this.Url + 'CreateNewTransaction/' + userId,
      newtransaction,
      this.options
    );
  }

  // Update Transaction by its id  :

  // Delete Transaction By its Id :
  DeleteTransaction(transactionId: number) {
    return this.myclient.delete(
      this.Url + 'DeleteTransaction/' + transactionId,
      this.options
    );
  }

  //#endregion
}
