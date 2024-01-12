import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth.guard';

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
