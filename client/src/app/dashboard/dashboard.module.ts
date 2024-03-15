import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './pages/main/main.component';
import { ShowroomComponent } from './pages/showroom/showroom.component';
import { CurrencyComponent } from './pages/currency/currency.component';
import { WeatherComponent } from '../core/components/weather/weather.component';
import { DirectionNamePipe } from "../core/pipes/direction-name.pipe";
import { DirectorComponent } from './pages/director/director.component';



@NgModule({
    declarations: [
        DashboardComponent,
        HeaderComponent,
        FooterComponent,
        MainComponent,
        ShowroomComponent,
        CurrencyComponent,
        WeatherComponent,
        DirectorComponent,
    ],
    exports: [HeaderComponent, FooterComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        DirectionNamePipe
    ]
})
export class DashboardModule { }
