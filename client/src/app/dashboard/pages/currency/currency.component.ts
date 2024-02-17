import { Component, OnInit } from '@angular/core';
import { GeneralCurrencyModel } from 'src/app/core/models/job.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  currencies:any;
  /**
   *
   */
  constructor(private adminService: AdminService) {



  }

  ngOnInit(): void {

    this.adminService.currencies$.subscribe(curr=> {
      this.currencies = <GeneralCurrencyModel> curr;

     })
  }

}
