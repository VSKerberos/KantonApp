import { Component, OnInit } from '@angular/core';
import { BlockDirectorModel } from 'src/app/core/models/job.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-blok',
  templateUrl: './blok.component.html',
  styleUrls: ['./blok.component.css']
})
export class BlokComponent implements OnInit {

  avaliableBlockDirectors:BlockDirectorModel[]=[];
  firstBlockDirectors:BlockDirectorModel[]=[];
  secondBlockDirectors:BlockDirectorModel[]=[];
  thirdBlockDirectors:BlockDirectorModel[]=[];




  constructor(private adminService:AdminService) {


  }

  ngOnInit(): void {
    this.loadJobs();
  }


  loadJobs(): void {


    this.adminService.listOfBlockDirector()
    .subscribe(
      {
        next: response=> this.avaliableBlockDirectors = response,
        error: error=> console.log(error),
        complete:()=> {
          console.log('Request has completed');
          console.log(this.avaliableBlockDirectors);
          this.firstBlockDirectors = this.avaliableBlockDirectors.filter(x=>x.islandId == 1);
          this.secondBlockDirectors = this.avaliableBlockDirectors.filter(x=>x.islandId == 2);
          this.thirdBlockDirectors = this.avaliableBlockDirectors.filter(x=>x.islandId == 3);
         }



  });

  }
}
