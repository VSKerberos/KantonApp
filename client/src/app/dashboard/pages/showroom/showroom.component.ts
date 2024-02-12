import { Component, OnInit } from '@angular/core';
import { ShowRoomModel } from 'src/app/core/models/job.model';
import { AdminService } from 'src/app/core/services/admin.service';
import { saveAs } from "file-saver";

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
  getDocument(fileName:string){
    console.log(fileName);

    this.service.downloadFile(fileName).subscribe(
      (result:any) => {

        saveAs(result, fileName);
        return {'data': {'message': 'download success'}};

      });

  }


}
