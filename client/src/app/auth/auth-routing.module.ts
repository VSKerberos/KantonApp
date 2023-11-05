import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { JobComponent } from './job/job.component';

const routes: Routes = [
  {
    path:'', component:LoginComponent,
  },
  {
    path:'job',component:JobComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
