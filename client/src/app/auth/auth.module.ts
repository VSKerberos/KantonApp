import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { JobComponent } from './job/job.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from '../core/interceptors/loading.interceptor';



@NgModule({
  declarations: [
    LoginComponent,
    JobComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,

  ]

})
export class AuthModule { }
