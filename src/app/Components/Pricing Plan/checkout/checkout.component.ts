import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { CreateTransaction } from 'src/app/Models/Transaction/Create-Transaction';
import { PlanService } from 'src/app/Services/Plan_Service/plan.service';
import { TransactionService } from 'src/app/Services/Transaction_Service/transaction.service';
import { FreelancerService } from 'src/app/Services/freelancer.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    public PlanService: PlanService,
    public Route: ActivatedRoute,
    public Freelancer: FreelancerService,
    public router: Router,
    public transservice: TransactionService
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

  ngOnInit(): void {
    this.initConfig();
    this.Route.paramMap.subscribe((params) => {
      this.myParam = params.get('PlanId');
    });

    this.PlanService.GetPlanById(this.myParam).subscribe({
      next: (data) => {
        this.plan = data;
        this.PaymentAmount = this.plan.price;
        console.log(this.PaymentAmount);
      },
      error: () => {},
    });

    this.Freelancer.GetCurrentFreelancer().subscribe({
      next: (data: any) => {
        this.CurrentFreelancer = data.body;

        console.log(this.CurrentFreelancer);
        console.log(this.CurrentFreelancer.id);
      },
      error: () => {},
    });
  }

  private initConfig(): void {
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
          this.CurrentFreelancer.planId = this.plan.id;
          let myData = new FormData();
          myData.append('id', this.CurrentFreelancer.id);
          this.Freelancer.UpdateFreelancer(myData);
          console.log(this.CurrentFreelancer);

          this.element = document.getElementById('Success');
          this.element.innerHTML += 'Your Payment Had Succeded...Enjoy';
          this.element.classList.add('alert');
          this.element.classList.add('alert-primary');

          // ***** Transaction  ***** //
          // let transactiondate: Date = new Date(Date.now());
          let newtransaction: CreateTransaction = new CreateTransaction(
            new Date(),
            this.PaymentAmount,
            this.plan.name
          );

          this.transservice
            .CreateNewTransaction(this.CurrentFreelancer.id, newtransaction)
            .subscribe({
              next: (data: any) => {
                console.log(data);
              },
              error: (err: any) => {
                console.log(err);
              },
            });

          // const childElement = document.createElement('p');
          // childElement.textContent = 'Your Payment Had Succeded...Enjoy';
          // let attr=document.createAttribute("class")

          // this.element.appendChild(childElement);

          setTimeout(() => {
            this.router.navigateByUrl('/');
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
