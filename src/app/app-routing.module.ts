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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  // {path:"Register",component:RegisterComponent},
  { path: 'Login', component: LoginComponent },
  { path: 'SignUp', component: SingupComponent },
  { path: 'ProjectPost/Create', component: CreateProjectPostComponent },
  { path: 'ProjectPost/:id/Update', component: UpdateProjectPostComponent },
  { path: 'ProjectPost/:id/Delete', component: DeleteProjectPostComponent },
  { path: 'ProjectPost/GetAll', component: AllProjectPostsComponent },
  { path: 'ProjectPost/:id', component: ProjectPostComponent },
  { path: 'plan', component: PlanComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
