import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactComponent } from './contact/contact.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: WelcomeComponent,
  },
  {
    path: 'userhome',
    component: UserHomeComponent,
  },
  {
    path: 'addblog',
    component: AddBlogComponent,
  },
  {
    path: 'viewblog/:id',
    component: ViewBlogComponent,
  },
  {
    path: 'editblog/:id',
    component: EditBlogComponent,
  },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'contactlist',
    component: ContactListComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
