import { Component, OnInit, Input, Inject } from '@angular/core';
import { ListingService } from 'src/app/core/services/api/listing.service';
import { Property } from '../../models/listing/property';
import { PropertyBasic } from '../../models/listing/property-basic';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-property-frame',
  templateUrl: './property-frame.component.html',
  styleUrls: ['./property-frame.component.scss']
})
export class PropertyFrameComponent implements OnInit {

  @Input() public property: Property;
  items: Array<{ image: string }> = [];
  public userTechnologies: string[];
  public skills = [".NET", "Angular", "C#", "Java"];
  public image = "https://www.trulia.com/pictures/thumbs_6/zillowstatic/fp/0082534543178d83e75145f292ada892-full.webp";

  constructor(    
    @Inject(ListingService) private listingService: ListingService,) { }

  ngOnInit() {
    console.log(this.property);
    this.listingService.getPropertyByMySqlId(this.property.MySqlId).subscribe((res: any) => {
      console.log(res);
      if (res.Result.IsValid) {
        this.property = res.Result.Data;
        console.log(this.property.Images)
        if (this.property.Images) {
          console.log(this.property.Images)
          this.property.Images.forEach(i => {
            this.items.push({ image: i.ImageUrl });
          })
        }
        console.log(this.property);
      }
    });
  //  if (this.property.MainPhotoUrl){
  //    this.image = this.property.MainPhotoUrl;
  //  }
  }


}
