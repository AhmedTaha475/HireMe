import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/Home/home/home.component';
import { SingupComponent } from './Components/singup/singup.component';
import { LoginComponent } from './Components/Login/login/login.component';
import { CreateProjectPostComponent } from './Components/ProjectPost/create-project-post/create-project-post.component';
import { UpdateProjectPostComponent } from './Components/ProjectPost/update-project-post/update-project-post.component';
import { DeleteProjectPostComponent } from './Components/ProjectPost/delete-project-post/delete-project-post.component';
import { AllProjectPostsComponent } from './Components/ProjectPost/all-project-posts/all-project-posts.component';
import { ProjectPostComponent } from './Components/ProjectPost/project-post/project-post.component';
import { PlanComponent } from './Components/Pricing Plan/plan/plan.component';
import { CheckoutComponent } from './Components/Pricing Plan/checkout/checkout.component';
import { AuthGuard } from './Guard_Services/auth.guard';
import { Error404Component } from './Components/ErrorComponents/error404/error404.component';
import { Error403Component } from './Components/ErrorComponents/error403/error403.component';
import { AdminEntryComponent } from './Components/AdminDashBoard/admin-entry/admin-entry.component';
import { AdminHomeComponent } from './Components/AdminDashBoard/admin-home/admin-home.component';
import { UsersWebsiteEntryComponent } from './Components/users-website-entry/users-website-entry.component';
import { StripeComponent } from './Components/Pricing Plan/PaypalButtonComponent/stripe/stripe.component';
import { AdminLookuptablecrudComponent } from './Components/AdminDashBoard/admin-lookuptablecrud/admin-lookuptablecrud.component';
import { FreelancerProfileComponent } from './Components/FreelancerProfile/freelancer-profile/freelancer-profile.component';
import { FreelancerProfileDashboardComponent } from './Components/FreelanserDashBoard/freelancer-profile/freelancer-profile.component';
import { FreelancersByCategoryComponent } from './Components/FreeLancersByCategory/freelancers-by-category/freelancers-by-category.component';
import { AdminLookupvaluesComponent } from './Components/AdminDashBoard/admin-lookupvalues/admin-lookupvalues.component';
import { FreelancerEntryComponent } from './Components/FreelanserDashBoard/freelancer-entry/freelancer-entry.component';
import { FreelancerHomeComponent } from './Components/FreelanserDashBoard/freelancer-home/freelancer-home.component';
import { FreelancerProjectsComponent } from './Components/FreelanserDashBoard/freelancer-projects/freelancer-projects.component';
import { FreelancerProfileEditComponent } from './Components/FreelanserDashBoard/freelancer-profile-edit/freelancer-profile-edit.component';

const routes: Routes = [
  {
    path: '',
    component: UsersWebsiteEntryComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'Home', component: HomeComponent },
      { path: 'Login', component: LoginComponent },
      { path: 'SignUp', component: SingupComponent },
      { path: 'ProjectPost/Create', component: CreateProjectPostComponent },
      { path: 'ProjectPost/:id/Update', component: UpdateProjectPostComponent },
      { path: 'ProjectPost/:id/Delete', component: DeleteProjectPostComponent },
      { path: 'ProjectPost/GetAll', component: AllProjectPostsComponent },
      { path: 'ProjectPost/:id', component: ProjectPostComponent },
      { path: 'plan', component: PlanComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'Page404', component: Error404Component },
      { path: 'Page403', component: Error403Component },

      { path: 'stripe', component: StripeComponent },

      { path: 'FreelancerProfile', component: FreelancerProfileComponent },
      { path: 'Category/:id', component: FreelancersByCategoryComponent },
    ],
  },
  {
    path: 'Admin',
    component: AdminEntryComponent,
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'Home', component: AdminHomeComponent },
      { path: 'lookuptable', component: AdminLookuptablecrudComponent },
      { path: 'lookupvalues', component: AdminLookupvaluesComponent },
    ],
  },
  {
    path: 'Freelancer',
    component: FreelancerEntryComponent,
    children: [
      { path: '', component: FreelancerHomeComponent },
      { path: 'Home', component: FreelancerHomeComponent },
      { path: 'Profile', component: FreelancerProfileDashboardComponent },
      { path: 'Profile/Update', component: FreelancerProfileEditComponent },
      { path: 'Projects', component: FreelancerProjectsComponent },
    ],
  },

  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
