import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ContactModel } from 'src/app/core/models/job.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  @ViewChild('desc') myTextArea: any;

  constructor(private adminService:AdminService,private toaster:ToastrService,public translate: TranslateService){

  }


  contactForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(35)]),
    desc:new FormControl('', [Validators.required, Validators.minLength(9),Validators.maxLength(135)]),
    email:new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(35),
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
  });




  onSubmit(){

    if(this.contactForm.valid)
     {
       let currentContact:ContactModel= {
         name:this.firstName?.value || '',
         surname:this.surname?.value ||'',
         description:  this.myTextArea.nativeElement.value  || '' ,
         email:this.email?.value || ''
       };

       this.adminService.addContact(currentContact).subscribe(
         (response) => {
          this.toaster.success('Başarılı bir şekilde eklendi');
          this.clearForms();

        },
         (error) => { console.log(error); });

     }

   }


   get firstName() {
    return this.contactForm.get('firstName');
 }

 get surname() {
  return this.contactForm.get('surname');
}

get email() {
  return this.contactForm.get('email');
}

get description() {
  return this.contactForm.get('desc');
}

clearForms()
{
  this.contactForm.patchValue({
    firstName: ' ',
    surname: ' ',
    desc: ' ',
    email:' '
 });
}

}
