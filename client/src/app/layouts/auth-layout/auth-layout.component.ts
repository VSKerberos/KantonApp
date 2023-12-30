import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {

  isclicked:boolean=false;

  constructor(private router: Router) {}

  toggle(event:any) {
    event.stopPropagation();
    this.isclicked=!this.isclicked;
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Navigation is starting... show a loading spinner perhaps?
        // blog on that here: ultimatecourses.com/blog/angular-loading-spinners-with-router-events
        this.isclicked =false;
      }
      if (event instanceof NavigationEnd) {
        // We've finished navigating
      }
      if (event instanceof NavigationError) {
        // something went wrong, log the error
          console.log(event.error);
      }
    });
  }
}
