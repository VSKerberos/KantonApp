import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { JobComponent } from './job/job.component';
import { DirectorComponent } from './director/director.component';
import { BlockdirectorComponent } from './blockdirector/blockdirector.component';

const routes: Routes = [
  {
    path:'', component:LoginComponent,
  },
  {
    path:'job',component:JobComponent
  },
  {
    path:'director', component:DirectorComponent
  },
  {
    path:'blockdirector', component:BlockdirectorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
