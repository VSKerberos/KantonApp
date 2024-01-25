import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './pages/main/main.component';
import { ShowroomComponent } from './pages/showroom/showroom.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ShowroomComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  exports: [HeaderComponent,FooterComponent]
})
export class DashboardModule { }
