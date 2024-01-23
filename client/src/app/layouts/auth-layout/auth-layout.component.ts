import { Component, Inject, OnInit, } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {

  isclicked:boolean=false;

  constructor(  private router: Router,
                public service: AdminService,
                @Inject(DOCUMENT) private document: Document,

    ) {}

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

    this.initialize();
  }

  initialize() {


    setTimeout(() => {
      this.document.getElementById('theme')?.setAttribute('href','assets/admin.css')
    }, 2000);



  }

  logout() {
    this.service.logOutUser();
    this.router.navigateByUrl("admin/login");
  }
}
