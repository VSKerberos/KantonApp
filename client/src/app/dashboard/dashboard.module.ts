import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { BlokComponent } from './pages/blok/blok.component';
import { CardviewComponent } from '../core/components/cardview/cardview.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../core/components/text-input/text-input.component';



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
        BlokComponent,
        CardviewComponent,
        ContactComponent



    ],
    exports: [HeaderComponent, FooterComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ReactiveFormsModule,
        DirectionNamePipe
    ]
})
export class DashboardModule { }
