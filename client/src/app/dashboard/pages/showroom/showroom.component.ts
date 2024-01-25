import { Component, OnInit } from '@angular/core';
import { ShowRoomModel } from 'src/app/core/models/job.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.css']
})
export class ShowroomComponent implements OnInit {

  avaliableShowroom : ShowRoomModel[]=[];
  /**
   *
   */
  constructor(private service:AdminService) {


  }

  ngOnInit(): void {
    this.service.listShowRoom().subscribe(res=>{

      this.avaliableShowroom = res;
    });
  }

  loadShowRooms(){
    this.service.listShowRoom().subscribe(res=>{

      this.avaliableShowroom = res;
    });
  }



}
