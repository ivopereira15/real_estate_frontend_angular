import { Component, Inject, Input, OnInit } from '@angular/core';
import { ListingService } from '../../../../core/services/api/listing.service';
import { Property } from '../../../../shared/models/listing/property';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() public property: Property;
  items: Array<{ image: string }> = [];
  public userTechnologies: string[];
  public skills = [".NET", "Angular", "C#", "Java"];
  //public image = "https://www.trulia.com/pictures/thumbs_6/zillowstatic/fp/0082534543178d83e75145f292ada892-full.webp";
  loading: boolean = false;

  constructor(    
    @Inject(ListingService) private listingService: ListingService,) { }

  ngOnInit() {
    console.log(this.property);
    this.loading = true;
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
        this.loading = false;
        console.log(this.property);
      }else {
        //TODO think what to do when no photo
        this.loading = false;
      }
    });
  //  if (this.property.MainPhotoUrl){
  //    this.image = this.property.MainPhotoUrl;
  //  }
  }


}