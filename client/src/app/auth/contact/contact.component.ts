import { Component, OnInit } from '@angular/core';
import { ContactModel } from 'src/app/core/models/job.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

avaliableContacts:ContactModel[]=[];

constructor(private adminService: AdminService) {


}
  ngOnInit(): void {
    this.loadContacts();
  }

deleteContactRecord(id:any) {


}

loadContacts()
{
  this.adminService.listOfContacts()
  .subscribe(
    {
      next: response=> this.avaliableContacts = response,
      error: error=> console.log(error),
      complete:()=> {
        console.log('Request has completed');
       }

    }
);

}



}
