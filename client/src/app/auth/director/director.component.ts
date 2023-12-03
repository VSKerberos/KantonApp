import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JobModel } from 'src/app/core/models/job.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {

  avaliableJobs: JobModel[]=[];
  directorForm = new FormGroup({
    secondName: new FormControl('', [ Validators.minLength(5),Validators.maxLength(35)]),
    firstName: new FormControl('', [Validators.minLength(5), Validators.maxLength(35)]),

  });


  constructor(private adminService: AdminService,
    private toaster:ToastrService){

    }
  ngOnInit(): void {
    this.loadJobs();
  }


  onSubmit(){


  }


  loadJobs(): void {
    this.adminService.listOfJobs()
    .subscribe(
      {
        next: response=> this.avaliableJobs = response,
        error: error=> console.log(error),
        complete:()=> {
          console.log('Request has completed');
          this.directorForm.patchValue({
            firstName: ' '
         });
         }

      }
  );
  }
}
