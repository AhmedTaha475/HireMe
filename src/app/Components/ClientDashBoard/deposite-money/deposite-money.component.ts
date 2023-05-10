import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { UpdateClientMoney } from 'src/app/Models/Client/update-client-money';
import { UpdateFreelancertMoney } from 'src/app/Models/Freelancer/update-freelancert-money';
import { CreateTransaction } from 'src/app/Models/Transaction/Create-Transaction';
import { PlanService } from 'src/app/Services/Plan_Service/plan.service';
import { TransactionService } from 'src/app/Services/Transaction_Service/transaction.service';
import { ClientService } from 'src/app/Services/client.service';
import { FreelancerService } from 'src/app/Services/freelancer.service';

@Component({
  selector: 'app-deposite-money',
  templateUrl: './deposite-money.component.html',
  styleUrls: ['./deposite-money.component.css'],
})
export class DepositeMoneyComponent implements OnInit {
  depositeGroup = new FormGroup({
    depositeAmount: new FormControl('', [Validators.required]),
  });
  constructor(
    public translate: TranslateService,
    public PlanService: PlanService,
    public Route: ActivatedRoute,
    public Freelancer: FreelancerService,
    public router: Router,
    public transservice: TransactionService,
    public clientService: ClientService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
  plan: any;
  myParam: any;
  PaymentAmount: any;
  CurrentFreelancer: any;
  element: any;
  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean | undefined;
  client: any;
  clientId: any;

  confirmAmount() {
    if (this.depositeGroup.valid) {
      this.PaymentAmount = this.depositeGroup.get('depositeAmount')?.value;
    }
  }
  ngOnInit(): void {
    this.initConfig();
    this.clientService.GetCurrentClient().subscribe({
      next: (data: any) => {
        this.client = data.body;
        this.clientId = this.client.id;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private initConfig(): void {
    // const paymentAmountElement = document.getElementById('paymentAmount');
    // if (paymentAmountElement instanceof HTMLInputElement) {
    //   this.PaymentAmount = paymentAmountElement.value || 0;
    // }
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: this.PaymentAmount,
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: this.PaymentAmount,
                  },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'EUR',
                    value: this.PaymentAmount,
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
          //#region Logic After Payment Success
          // let newBalance = this.PaymentAmount + this.client.balance;
          // let clientData = new UpdateClientMoney (newBalance, null, null);
          // console.log(clientData);
          // // this.clientService.UpdateClientMoney(clientData).subscribe({
          // //   next:(data)=>{

          // //   },
          // //   error:(err)=>{}
          // // })
          // this.element = document.getElementById('Success');
          // this.element.innerHTML += 'Your Payment Had Succeded...Enjoy';
          // this.element.classList.add('alert');
          // this.element.classList.add('alert-primary');
          //#endregion
          // ***** Transaction  ***** //
          // let transactiondate: Date = new Date(Date.now());
          let newtransaction: CreateTransaction = new CreateTransaction(
            new Date(),
            this.PaymentAmount,
            'You Have Deposited ' + this.PaymentAmount + ' Using PayPal'
          );

          this.transservice
            .CreateNewTransaction(this.clientId, newtransaction)
            .subscribe({
              next: (data: any) => {
                //#region Logic After Payment Success
                let newBalance = this.PaymentAmount + this.client.balance;
                let clientData = new UpdateClientMoney(newBalance, null, null);
                this.clientService.UpdateClientMoney(clientData).subscribe({
                  next: (data) => {
                    console.log('Success');
                    console.log(data);
                  },
                  error: (err) => {
                    console.log(err);
                  },
                });
                this.element = document.getElementById('Success');
                this.element.innerHTML += 'Your Payment Had Succeded...Enjoy';
                this.element.classList.add('alert');
                this.element.classList.add('alert-primary');
                //#endregion
              },
              error: (err: any) => {
                console.log(err);
              },
            });
          setTimeout(() => {
            this.router.navigateByUrl('/client');
          }, 3000);
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
        this.element.innerHTML += 'Falid';

        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 3000);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
