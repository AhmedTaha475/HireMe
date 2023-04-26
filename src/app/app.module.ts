import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common'

import { SidebarModule } from 'primeng/sidebar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectPostComponent } from './ProjectPost/project-post/project-post.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/Home/home/home.component';
import { SingupComponent } from './Components/singup/singup.component';
import { LoginComponent } from './Components/Login/login/login.component';
import { ClientSidebarComponent } from './Client/client-sidebar/client-sidebar.component';
import { UpdateProjectPostComponent } from './Components/ProjectPost/update-project-post/update-project-post.component';
import { DeleteProjectPostComponent } from './Components/ProjectPost/delete-project-post/delete-project-post.component';
import { AllProjectPostsComponent } from './Components/ProjectPost/all-project-posts/all-project-posts.component';
import { PlanComponent } from './Components/Pricing Plan/plan/plan.component';
import { CheckoutComponent } from './Components/Pricing Plan/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './Guard_Services/auth.interceptor';
import { Error404Component } from './Components/ErrorComponents/error404/error404.component';
import { Error403Component } from './Components/ErrorComponents/error403/error403.component';
import { AdminEntryComponent } from './Components/AdminDashBoard/admin-entry/admin-entry.component';
import { AdminHomeComponent } from './Components/AdminDashBoard/admin-home/admin-home.component';
import { UsersWebsiteEntryComponent } from './Components/users-website-entry/users-website-entry.component';

import { FreelancerProfileComponent } from './Components/FreelancerProfile/freelancer-profile/freelancer-profile.component';


import { AdminLookuptablecrudComponent } from './Components/AdminDashBoard/admin-lookuptablecrud/admin-lookuptablecrud.component';
import { AdminHeaderComponent } from './Components/AdminDashBoard/admin-header/admin-header.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { FreelancersByCategoryComponent } from './Components/FreeLancersByCategory/freelancers-by-category/freelancers-by-category.component';

import { JQueryLoaderDirective } from './CustomDirectives/j-query-loader.directive';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ProjectPostComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SingupComponent,
    LoginComponent,
    ClientSidebarComponent,
    UpdateProjectPostComponent,
    DeleteProjectPostComponent,
    AllProjectPostsComponent,
    PlanComponent,
    CheckoutComponent,
    Error404Component,
    Error403Component,
    AdminEntryComponent,
    AdminHomeComponent,
    UsersWebsiteEntryComponent,
    FreelancersByCategoryComponent,
    FreelancerProfileComponent,

    AdminLookuptablecrudComponent,
    AdminHeaderComponent,
    JQueryLoaderDirective,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    SidebarModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
