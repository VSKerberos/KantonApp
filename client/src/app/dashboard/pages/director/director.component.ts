import { Component, OnInit } from '@angular/core';
import { DirectorModel } from 'src/app/core/models/job.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {

  avaliableDirectors: DirectorModel[]=[];

  constructor(private adminService:AdminService){

  }

  ngOnInit(): void {
    this.loadJobs();
    }







  loadJobs(): void {



    this.adminService.listOfDirector()
    .subscribe(
      {
        next: response=> this.avaliableDirectors = response,
        error: error=> console.log(error),
        complete:()=> {
          console.log('Request has completed');
         }

      }
  );

}
}
