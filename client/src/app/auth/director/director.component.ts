import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DirectorModel, JobModel } from 'src/app/core/models/job.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {

  avaliableJobs: JobModel[]=[];
  selectedJobId:any;
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
    if(this.directorForm.valid)
    {
      let localDirector:DirectorModel= {
        name:this.firstName?.value || '',
        surname:this.secondName?.value || '',
        jobId : this.selectedJobId

        };
      this.adminService.addDirector(localDirector).subscribe(
        (response) => { this.toaster.success('Başarılı bir şekilde eklendi')},
        (error) => { console.log(error); });

  }
}

onChange(value: any) {
  this.selectedJobId = value.target.value;
}

get firstName() {
  return this.directorForm.get('firstName');
}

get secondName() {
  return this.directorForm.get('secondName');
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
