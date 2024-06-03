import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DirectorComponent } from './pages/director/director.component';
import { AdvertComponent } from './pages/advert-detail/advert/advert.component';

const routes: Routes = [
  {
    path:'', component:DashboardComponent,
    children:[
      {
        path:'dahboard',
        component:DashboardComponent
      }




    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
