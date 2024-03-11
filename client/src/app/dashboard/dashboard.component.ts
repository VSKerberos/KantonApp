import { Component, OnInit } from '@angular/core';
import { AdminService } from '../core/services/admin.service';
import { MainModel } from '../core/models/job.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  weathers :MainModel[] =[{
   current:{humidity:0,temp_c:'',wind_dir:'',wind_kph:''},
   location:{lat:'',lon:'',name:''}
   }];
constructor(public adminService:AdminService){

}

  ngOnInit(): void {


    this.adminService.weathers$.subscribe(weather => this.weathers = weather);
  }

}
