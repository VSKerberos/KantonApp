import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { JobComponent } from './job/job.component';
import { DirectorComponent } from './director/director.component';
import { BlockdirectorComponent } from './blockdirector/blockdirector.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { LinksComponent } from './links/links.component';
import { ContactComponent } from './contact/contact.component';
import { authGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path:'login', component:LoginComponent
  },
  {
    path:'job',component:JobComponent,
    canActivate:[authGuard]
  },
  {
    path:'director', component:DirectorComponent,
    canActivate:[authGuard]
  },
  {
    path:'blockdirector', component:BlockdirectorComponent,
    canActivate:[authGuard]
  },
  {
    path:'showcase', component:ShowcaseComponent,
    canActivate:[authGuard]
  },
  {
    path:'usefullinks', component:LinksComponent,
    canActivate:[authGuard]
  },
  {
    path:'contact', component:ContactComponent,
    canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
