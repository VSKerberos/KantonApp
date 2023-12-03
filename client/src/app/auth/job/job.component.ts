import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JobModel } from 'src/app/core/models/job.model';
import { AdminService } from 'src/app/core/services/admin.service';
import {FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit,AfterContentChecked {

  jobForm = new FormGroup({
    name: new FormControl('', [ Validators.minLength(5),Validators.maxLength(35)]),
    firstName: new FormControl('', [Validators.minLength(5), Validators.maxLength(35)]),

  });

  clicked:boolean=false;
  currentJobs: JobModel[]=[];
  constructor(
    private adminService: AdminService,
    private toaster:ToastrService,
    private changeDetector: ChangeDetectorRef){


  }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  get firstName() {
    return this.jobForm.get('firstName');
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
        complete:()=> {
          console.log('Request has completed');
          this.jobForm.patchValue({
            firstName: ' '
         });
         }

      }
  );
  }

  setClass() {
    this.clicked=!this.clicked;
    console.log(this.clicked);
  }

  onSubmit() {
    console.log('Valid?', this.jobForm.valid); // true or false
    console.log('Name', this.firstName?.value);
    let jobName: string= this.firstName?.value || '' ;
    console.log(` comes from component ${jobName}`);
    console.log('custom input value: '+ this.jobForm.get('firstName')?.value);
    if(this.jobForm.valid)
    {
      let localJob:JobModel= { title:jobName};
      this.adminService.addJob(localJob).subscribe(
        (response) => { this.toaster.success('Başarılı bir şekilde eklendi');this.loadJobs(); },
        (error) => { console.log(error); });

    }

  }

  deleteJob(jobId:any)
  {
    this.adminService.deleteJob(jobId)
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
