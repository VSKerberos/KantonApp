import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { DirectorModel, JobModel } from 'src/app/core/models/job.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {

  avaliableJobs: JobModel[]=[];
  avaliableDirectors: DirectorModel[]=[];
  selectedJobId:any;
  directorForm = new FormGroup({
    secondName: new FormControl('', [ Validators.minLength(2),Validators.maxLength(35)]),
    firstName: new FormControl('', [Validators.minLength(3), Validators.maxLength(35)]),

  });


  constructor(private adminService: AdminService,
    private toaster:ToastrService){

    }
  ngOnInit(): void {
    this.loadJobs();
  }


  onSubmit(){
    if(!this.selectedJobId)
    {
      this.toaster.error('Lütfen görev seçiniz.');
      return;
    }
    if(this.directorForm.valid)
    {
      let localDirector:DirectorModel= {
        name:this.firstName?.value || '',
        surName:this.secondName?.value || '',
        jobId : this.selectedJobId

        };
      this.adminService.addDirector(localDirector).subscribe(
        (response) => {
          this.toaster.success('Başarılı bir şekilde eklendi');
          this.loadJobs();
          this.clearForms();
        },
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
clearForms()
{
  this.directorForm.patchValue({
    firstName: ' ',
    secondName: ' '
 });
}



  loadJobs(): void {

    const loadJobsAPI = this.adminService.listOfJobs();
    const loadDirectorsAPI = this.adminService.listOfDirector();

    forkJoin([loadJobsAPI, loadDirectorsAPI]) //we can use more that 2 api request
            .subscribe(
                result => {
                    //this will return list of array of the result
                    this.avaliableJobs= result[0];
                    this.avaliableDirectors = result[1];
                },
                error=>{
                  console.log(error);
                }
            );
  }

  deleteDirector(directorId:any)
  {
    this.adminService.deleteDirector(directorId)
    .subscribe({
        next: data => {
          this.toaster.success('Başarılı bir şekilde silindi');
            this.loadJobs();
        },
        error: error => {
            console.error('There was an error!', error);
        }
    });
  }
}
