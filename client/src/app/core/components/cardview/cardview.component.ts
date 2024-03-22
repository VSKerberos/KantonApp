import { Component, Input } from '@angular/core';
import { BlockDirectorModel } from '../../models/job.model';

@Component({
  selector: 'app-cardview',
  templateUrl: './cardview.component.html',
  styleUrls: ['./cardview.component.css']
})
export class CardviewComponent {


  @Input() directors :BlockDirectorModel[]=[];
}
