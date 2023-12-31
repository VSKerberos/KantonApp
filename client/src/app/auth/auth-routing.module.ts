import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { JobComponent } from './job/job.component';
import { DirectorComponent } from './director/director.component';
import { BlockdirectorComponent } from './blockdirector/blockdirector.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { LinksComponent } from './links/links.component';
import { ContactComponent } from './contact/contact.component';

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
  },
  {
    path:'showcase', component:ShowcaseComponent
  },
  {
    path:'usefullinks', component:LinksComponent
  },
  {
    path:'contact', component:ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
