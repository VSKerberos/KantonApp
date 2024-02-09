import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsefulLinksModel } from 'src/app/core/models/job.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit, AfterContentChecked {

  currentLinks:UsefulLinksModel[]=[];

  constructor(
    private changeDetector:ChangeDetectorRef,
    private adminService: AdminService,
    private toaster:ToastrService)

    {}

  linkForm = new FormGroup({
    header: new FormControl('', [ Validators.minLength(5),Validators.maxLength(35)]),
    url: new FormControl('', [ Validators.minLength(5),Validators.maxLength(65), ]),
    description: new FormControl('', [Validators.minLength(5), Validators.maxLength(35)]),

  });


  ngOnInit(): void {
    this.loadLinks();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }


  get header() {
    return this.linkForm.get('header');
 }

 get url() {
  return this.linkForm.get('url');
}

get description() {
  return this.linkForm.get('description');
}

  onSubmit(){

   if(this.linkForm.valid)
    {
      let localUsefulLink:UsefulLinksModel= {
        title:this.header?.value || '',
        description:this.description?.value || '' ,
        url:this.url?.value || ''
      };

      this.adminService.addUsefulLink(localUsefulLink).subscribe(
        (response) => { this.toaster.success('Başarılı bir şekilde eklendi');this.loadLinks(); },
        (error) => { console.log(error); });

    }

  }


  loadLinks()
  {
    this.adminService.listOfUsefulLinks()
    .subscribe(
      {
        next: response=> this.currentLinks = response,
        error: error=> console.log(error),
        complete:()=> {
          console.log('Request has completed');
          this.linkForm.patchValue({
            header: ' ',
            url: ' ',
            description: ' '
         });
         }

      }
  );

  }

  deleteLink(linkId:any)
  {
    this.adminService.deleteUsefulLink(linkId)
    .subscribe({
        next: data => {
          this.toaster.success('Başarılı bir şekilde silindi');
            this.loadLinks();
        },
        error: error => {
            console.error('There was an error!', error);
        }
    });

  }

}
