import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { UsefulLinksModel } from 'src/app/core/models/job.model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})


export class FooterComponent implements OnInit {

  allLinks: string[] = [];
  currentLinks:UsefulLinksModel[]=[];
  dynamicTemplate = `
  <div>
    <h1>[TITLE]</h1>
    <h2>[SUPERCHRIS]</h2>
    <p>[CONTENT]</p>
  </div>
`;

resultDynamicTemplate='';



mainDynamicTemplate = ` <div class="col-3 col-12-medium col-12-small">
<ul class="link-list">
  [DYNAMICROWS]
</ul>
</div>`;

mainDynamicTemplate2 = ` <div class="col-3 col-12-medium col-12-small">
<ul class="link-list">
  [DYNAMICROWS2]
</ul>
</div>`;

mainDynamicTemplate3 = ` <div class="col-3 col-12-medium col-12-small">
<ul class="link-list">
  [DYNAMICROWS3]
</ul>
</div>`;
  /**
   *
   */
  constructor(private adminService:AdminService) {



  }

  ngOnInit(): void {
    this.loadLinks();

  }

  getDynamicTemplate() {

    let dynamicTemplateParsed = this.mainDynamicTemplate;

    dynamicTemplateParsed = dynamicTemplateParsed.replace('[SUPERCHRIS]', '<i class="fa fa-chess-king"></i>');
    dynamicTemplateParsed = dynamicTemplateParsed.replace('[CONTENT]', 'My super dynamic content');
    let linksTemplate1 ='';
    let linksTemplate2 ='';
    let linksTemplate3 ='';


      if(!(this.currentLinks && this.currentLinks.length>0))
      return;


    for (var index in this.currentLinks) {

      var current='<li><a href="'+`${this.currentLinks[index].url}`+'" target="_blank">  '+`${this.currentLinks[index].title }`+'     </a></li>';

      this.allLinks.push(current);

      if((Number(index)+1)<=5)
      {
        linksTemplate1 = linksTemplate1 + current;
      } else if((Number(index)+1)>5 && (Number(index)+1)<=10)
      {
        linksTemplate2 = linksTemplate2 + current;
      } else if((Number(index)+1)>10 && (Number(index)+1)<=15) {
        linksTemplate3 = linksTemplate3 + current;
      }


    }

    dynamicTemplateParsed = dynamicTemplateParsed.replace('[DYNAMICROWS]',linksTemplate1);

    if(linksTemplate2.length>0) {
    this.mainDynamicTemplate2 = this.mainDynamicTemplate2.replace('[DYNAMICROWS2]',linksTemplate2);
    dynamicTemplateParsed = dynamicTemplateParsed + this.mainDynamicTemplate2;
    }

    if(linksTemplate3.length>0) {
      this.mainDynamicTemplate3 = this.mainDynamicTemplate3.replace('[DYNAMICROWS3]',linksTemplate3);
      dynamicTemplateParsed = dynamicTemplateParsed + this.mainDynamicTemplate3;
      }

    return dynamicTemplateParsed;
  }



  loadLinks()
  {
    this.adminService.listOfUsefulLinks()
    .subscribe(
      {
        next: response=> this.currentLinks = response,
        error: error=> console.log(error),
        complete:()=> {
          this.getDynamicTemplate();
         }

      }
  );

  }

}
