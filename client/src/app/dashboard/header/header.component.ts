import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isMobileDevice:boolean=false;
  isBurger:boolean= false;

  constructor(public translate: TranslateService){


    translate.addLangs(['tr', 'en']);
    translate.setDefaultLang('tr');


      translate.use('tr');

  }
  ngOnInit(): void {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      this.isMobileDevice =true;
    }else{
      this.isMobileDevice =false;

    }
  }

  translateToEnglish() {
    this.translate.use('en');
  }

  translateToTurkish() {
    this.translate.use('tr');
  }
  openBurgerMenu() {

    if(this.isMobileDevice)
    this.isBurger =! this.isBurger;

  }

}
