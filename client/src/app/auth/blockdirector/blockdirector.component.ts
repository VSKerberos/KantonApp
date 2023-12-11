import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { BlockDirectorModel, IslandModel, JobModel } from 'src/app/core/models/job.model';
import { AdminService } from 'src/app/core/services/admin.service';


@Component({
  selector: 'app-blockdirector',
  templateUrl: './blockdirector.component.html',
  styleUrls: ['./blockdirector.component.css']
})
export class BlockdirectorComponent {

  selectedJobId:any;
  selectedIsland:any;
  avaliableJobs: JobModel[]=[];
  avaliableBlockDirectors:BlockDirectorModel[]=[];
  avaliableIslands:any;


  blockDirectorForm = new FormGroup({
    secondName: new FormControl('', [ Validators.minLength(5),Validators.maxLength(35)]),
    firstName: new FormControl('', [Validators.minLength(5), Validators.maxLength(35)]),

  });


  constructor(private adminService:AdminService, private toaster:ToastrService)
  {

  }

  onChange(value: any) {

    this.selectedJobId = value.target.value;

  }

  onIslandChange(value:any){
    this.selectedIsland = value.target.value;
  }

  onSubmit() {


  }

  ngOnInit(): void {
    this.loadJobs();
    this.loadIslands();
  }

  loadIslands(){
      this.adminService.loadIslands().subscribe(res=>{

        this.avaliableIslands = res;
      });
  }

  loadJobs(): void {

    const loadJobsAPI = this.adminService.listOfJobs();
    const loadBlockDirectorsAPI = this.adminService.listOfBlockDirector();
    //const loadIslandsAPI = this.adminService.listOfIslands();

    forkJoin([loadJobsAPI, loadBlockDirectorsAPI]) //we can use more that 2 api request
            .subscribe(
                result => {
                    //this will return list of array of the result
                    this.avaliableJobs= result[0];
                    this.avaliableBlockDirectors = result[1];
                   // this.avaliableIslands = result[2];
                },
                error=>{
                  console.log(error);
                }
            );
  }

  deleteBlockDirector(id:any)
  {
    this.adminService.deleteBlockDirector(id)
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
