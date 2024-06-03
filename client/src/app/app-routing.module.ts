import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { DirectorComponent } from './dashboard/pages/director/director.component';
import { BlokComponent } from './dashboard/pages/blok/blok.component';
import { ContactComponent } from './dashboard/pages/contact/contact.component';
import { AdvertComponent } from './dashboard/pages/advert-detail/advert/advert.component';



const routes: Routes = [

  // App Routes
  {
    path:'',
    component:DashboardLayoutComponent,
    children: [
     {
      path:'',
      redirectTo:'/dashboard',
      pathMatch:'full'
    },
    {
      path:'dashboard',
      loadChildren: ()=> import('./dashboard/dashboard.module').then(m=> m.DashboardModule)
    },
    {
      path:'director',
      component:DirectorComponent
    },
    {
      path:'block',
      component:BlokComponent
    },
    {
      path:'contact',
      component:ContactComponent
    },
    {
      path:'advert',
      component:AdvertComponent
    }
    ]
  },

  // Auth Routes
  {
    path:'',
    component:AuthLayoutComponent,
    children: [
      {
        path:'admin',
        redirectTo:'/admin',
        pathMatch:'full'
      },
      {
        path:'admin',
        loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)

      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
