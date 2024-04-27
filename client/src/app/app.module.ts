import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { LoaderComponent } from './core/components/loader/loader.component';
import { ToastrModule} from 'ngx-toastr'
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { TextInputComponent } from './core/components/text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { DashboardModule } from './dashboard/dashboard.module';
import { DirectionNamePipe } from './core/pipes/direction-name.pipe';
import { ImageSliderComponent } from './core/components/image-slider/image-slider.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  //return new TranslateHttpLoader(httpClient);
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    DashboardLayoutComponent,
    ImageSliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoaderComponent,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot( {
      timeOut:5000,
      positionClass:"toast-top-right",
      preventDuplicates:true
    }),
    DashboardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true
    }
  ],

  bootstrap: [AppComponent],
  exports: [TranslateModule]


})
export class AppModule { }
