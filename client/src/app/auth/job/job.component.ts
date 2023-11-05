import { Component, OnInit } from '@angular/core';
import { JobModel } from 'src/app/core/models/job.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  clicked:boolean=false;
  currentJobs: JobModel[]=[];
  constructor(private adminService: AdminService){


  }

  ngOnInit(): void {
this.loadJobs();

  }

  loadJobs(): void {
    this.adminService.listOfJobs()
    .subscribe(
      {
        next: response=> this.currentJobs = response,
        error: error=> console.log(error),
        complete:()=> console.log('Request has completed')

      }
  );
  }

  setClass() {
    this.clicked=!this.clicked;
    console.log(this.clicked);
  }


}
