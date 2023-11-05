import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { LoaderComponent } from './core/components/loader/loader.component';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    DashboardLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoaderComponent
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
