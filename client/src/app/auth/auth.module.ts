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
import { BlockdirectorComponent } from './blockdirector/blockdirector.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { FilesizePipe } from "../core/pipes/filesize.pipe";
import { LinksComponent } from './links/links.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
    declarations: [
        LoginComponent,
        JobComponent,
        DirectorComponent,
        TextInputComponent,
        BlockdirectorComponent,
        ShowcaseComponent,
        LinksComponent,
        ContactComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        FilesizePipe
    ]
})
export class AuthModule { }
