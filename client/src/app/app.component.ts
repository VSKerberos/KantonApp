import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  users:any;

constructor(@Inject(DOCUMENT) private document: Document){

  this.document.getElementById('theme')?.setAttribute('href','assets/admin.css');

}


ngOnInit(){

}

}
