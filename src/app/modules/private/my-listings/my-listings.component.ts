import { AnimationMetadataType } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ListingService } from 'src/app/core/services/api/listing.service';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { PropertyBasic } from 'src/app/shared/models/listing/property-basic';

@Component({
  selector: 'app-my-listings',
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.scss']
})
export class MyListingsComponent implements OnInit {

  listedProperties: PropertyBasic[];
  public image = "https://www.trulia.com/pictures/thumbs_6/zillowstatic/fp/0082534543178d83e75145f292ada892-full.webp";

  constructor(
    private listingService: ListingService,
    private appContext: AppContextService) { }

  ngOnInit(): void {
    const userId = this.appContext.getUserId();
    this.listingService.getUserPropertiesBasic(userId).subscribe((result) => {
      if (result.isValid) {
        this.listedProperties = result.data;
      }
    });
  }

  edit(propertyId: number){
    // TODO navigate
  }

}
