import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  encapsulation:ViewEncapsulation.ShadowDom
})
export class LoaderComponent {

  constructor(public loader: LoaderService) {

  }
}
