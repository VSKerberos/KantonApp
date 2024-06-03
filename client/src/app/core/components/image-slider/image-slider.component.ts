import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'
@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit, OnDestroy {
  images: string[] = [
    '../../assets/images/advert/advert_1.jpg',
    '../../assets/images/advert/advert_3.jpg',
    '../../assets/images/advert/advert_4.jpg',
    '../../assets/images/advert/advert_5.jpg',
    '../../assets/images/advert/advert_2.jpg',
    '../../assets/images/advert/advert_6.jpg',
    '../../assets/images/advert/advert_7.jpg',
    '../../assets/images/advert/advert_8.jpg'
  ];
  currentImage: string = this.images[0];
  interval: any;

  constructor() { }

  ngOnInit(): void {
    this.startAutoSlider();
  }

  ngOnDestroy(): void {
    this.stopAutoSlider();
  }

  startAutoSlider() {
    this.interval = setInterval(() => {
      this.next();
    }, 3000); // Change interval as needed (in milliseconds)
  }

  stopAutoSlider() {
    clearInterval(this.interval);
  }

  next() {
    const currentIndex = this.images.indexOf(this.currentImage);
    if (currentIndex < this.images.length - 1) {
      this.currentImage = this.images[currentIndex + 1];
    } else {
      this.currentImage = this.images[0];
    }
  }

  prev() {
    const currentIndex = this.images.indexOf(this.currentImage);
    if (currentIndex > 0) {
      this.currentImage = this.images[currentIndex - 1];
    } else {
      this.currentImage = this.images[this.images.length - 1];
    }
  }
}
