import { Component, OnInit, signal } from '@angular/core';
import { AdminService } from '../core/services/admin.service';
import { MainModel } from '../core/models/job.model';
import { TranslateService } from '@ngx-translate/core';


interface Person {
  name: string;
  age: number;
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit {


  weathers :MainModel[] = [];


constructor(public adminService:AdminService,public translate: TranslateService){

}

  ngOnInit(): void {

    this.adminService.weathers$.subscribe(weather => this.weathers = weather);


  }




}
