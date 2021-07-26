import { Component, OnInit, Input } from '@angular/core';
import { PropertyBasic } from '../../models/listing/property-basic';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-property-frame',
  templateUrl: './property-frame.component.html',
  styleUrls: ['./property-frame.component.scss']
})
export class PropertyFrameComponent implements OnInit {

  @Input() public property: PropertyBasic;

  public userTechnologies: string[];
  public skills = [".NET", "Angular", "C#", "Java"];
  public image = "https://www.trulia.com/pictures/thumbs_6/zillowstatic/fp/0082534543178d83e75145f292ada892-full.webp";

  constructor() { }

  ngOnInit() {
   if (this.property.MainPhotoUrl){
     this.image = this.property.MainPhotoUrl;
   }
  }


}
