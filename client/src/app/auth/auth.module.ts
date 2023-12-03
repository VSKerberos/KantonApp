import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { JobComponent } from './job/job.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from '../core/interceptors/loading.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectorComponent } from './director/director.component';
import { TextInputComponent } from '../core/components/text-input/text-input.component';


@NgModule({
  declarations: [

    LoginComponent,
    JobComponent,
    DirectorComponent,
    TextInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,

  ]

})
export class AuthModule { }
