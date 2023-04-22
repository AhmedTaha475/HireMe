import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/Home/home/home.component';
import { SingupComponent } from './Components/singup/singup.component';
import { LoginComponent } from './Components/Login/login/login.component';
import { PlanComponent } from './Components/Pricing Plan/plan/plan.component';
import { CheckoutComponent } from './Components/Pricing Plan/checkout/checkout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  // {path:"Register",component:RegisterComponent},
  { path: 'Login', component: LoginComponent },
  { path: 'SignUp', component: SingupComponent },
  { path: 'plan', component: PlanComponent },
  { path: 'checkout', component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
