import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { concatMap, flatMap } from 'rxjs/operators';
import { ShowRoomModel } from 'src/app/core/models/job.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {

  constructor(private service:AdminService, private toaster:ToastrService){

  }
  ngOnInit(): void {
    this.loadShowRooms();
  }


  showcaseForm = new FormGroup({
    header: new FormControl('', [ Validators.minLength(5),Validators.maxLength(35)]),
    desc: new FormControl('', [Validators.minLength(3), Validators.maxLength(35)]),

  });

  uploadFile: File | null | undefined;
  uploadFileLabel: string | undefined = 'Choose an image to upload';
  currentData:ShowRoomModel | undefined | null;
  avaliableShowroom : ShowRoomModel[]=[];

  handleFileInput(files: FileList) {
    if (files.length > 0) {
      this.uploadFile = files.item(0);
      this.uploadFileLabel = this.uploadFile?.name;
    }
  }

  upload() {
    if (!this.uploadFile) {
     this.toaster.error('Lütfen dosya seçiniz.')
      return;
    }
    const formData = new FormData();
    formData.append('file', this.uploadFile, this.uploadFile.name);

    let current : ShowRoomModel= {
      desc:this.showcaseDesc?.value || '',
      header: this.showcaseHeader?.value || '',
      status:0,
      path:'',
      createdDate:new Date()
      };

    this.service.switchMapAddForm(formData,current).subscribe( ()=>{
      this.toaster.success('Başarılı bir şekilde eklendi');
      this.loadShowRooms();
    },(error: any) => {
      console.error(error);
    }

    )
    this.loadShowRooms();
    this.clearForm();
  }

  clearForm(){
    this.showcaseForm.patchValue({
      header: ' ',
      desc: ' '
   });
  }

  deleteBlockShowRoom(id:any)
  {
    // this.service.deleteShowRoom(id)
    // .subscribe({
    //     next: data => {
    //       this.toaster.success('Başarılı bir şekilde silindi');
    //     },
    //     error: error => {
    //         console.error('There was an error!', error);
    //     }
    // });

    this.service.switchMapDeleteForm(id).subscribe(res=>{
      this.toaster.success('Başarılı bir şekilde silindi');
      this.loadShowRooms();
    })
  }

  loadShowRooms(){
    this.service.listShowRoom().subscribe(res=>{

      this.avaliableShowroom = res;
    });
}

get showcaseHeader() {
  return this.showcaseForm.get('header');
}

get showcaseDesc() {
  return this.showcaseForm.get('desc');
}



  }


