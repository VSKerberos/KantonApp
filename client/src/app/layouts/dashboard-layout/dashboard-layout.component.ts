import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  images: string[] = [
    '../../assets/images/banner.png',
    '../../assets/images/kanton_11.webp',
    '../../assets/images/kanton_12.webp',
    '../../assets/images/kanton_13.webp',
    '../../assets/images/kanton_14.webp',
    '../../assets/images/kanton_15.webp',
  ];
  currentImage: string = this.images[0];
  interval: any;
  backgroundImg: any;
  constructor(private sanitization: DomSanitizer) {


    // setTimeout(() => {
    //   this.document.getElementById('theme')?.setAttribute('href','assets/main.css')
    // }, 2000);

  }
  ngOnInit(): void {
    this.startAutoSlider();
  }

  startAutoSlider() {
    this.interval = setInterval(() => {
      this.next();
    }, 3000); // Change interval as needed (in milliseconds)
  }

  // Return trust style
getSafeUrl(){
  return this.sanitization.bypassSecurityTrustStyle('url(\'assets/images/ataturk.webp\')');
}

next() {
  const currentIndex = this.images.indexOf(this.currentImage);
  if (currentIndex < this.images.length - 1) {
    this.currentImage = this.images[currentIndex + 1];
  } else {
    this.currentImage = this.images[0];

  }
  this.backgroundImg = this.sanitization.bypassSecurityTrustStyle('url('+this.currentImage+')');
}


}
