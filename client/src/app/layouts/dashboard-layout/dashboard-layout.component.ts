import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {


  constructor(@Inject(DOCUMENT) private document: Document) {


    // setTimeout(() => {
    //   this.document.getElementById('theme')?.setAttribute('href','assets/main.css')
    // }, 2000);

  }
}
