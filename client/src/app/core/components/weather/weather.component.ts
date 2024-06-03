import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  @Input() CityName:string | undefined='';
  @Input() lat:string| undefined ='';
  @Input() lon:string | undefined ='';
  @Input() temp:string | undefined='';
  @Input() windKph:string | undefined='';
  @Input() humidity?:number=0;
  @Input() windDirection:string="";


constructor(public translate: TranslateService){

}

}


/*

{
        "location": {
            "name": "Aydin",
            "lat": 37.84, enlem
            "lon": 27.85 boylam
        },
        "current": {
            "temp_c": "12.0", sıcaklık
            "wind_kph": "6.8", Rüzgar
            "wind_dir": "NE",
            "humidity": 82 Nem oranı
        }
    },
*/
