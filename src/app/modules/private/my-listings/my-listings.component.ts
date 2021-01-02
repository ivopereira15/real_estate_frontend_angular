import { AnimationMetadataType } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListingService } from 'src/app/core/services/api/listing.service';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { PropertyBasic } from 'src/app/shared/models/listing/property-basic';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-listings',
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.scss']
})
export class MyListingsComponent implements OnInit, OnDestroy {

  listedProperties: PropertyBasic[];
  public image = "https://www.trulia.com/pictures/thumbs_6/zillowstatic/fp/0082534543178d83e75145f292ada892-full.webp";

  userId: number;
  subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private listingService: ListingService,
    private appContext: AppContextService) { }

  ngOnInit(): void {
    this.userId = this.appContext.getUserId();
    this.subscriptions.add(
      this.listingService.getUserPropertiesBasic(this.userId).subscribe((result) => {
        if (result.IsValid) {
          this.listedProperties = result.Data;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  edit(propertyId: number) {
    this.router.navigate(['my-listings/edit/' + propertyId.toString()]);
  }

  delete(propertyId: number, index: number) {
    this.subscriptions.add(
      this.listingService.deletePropertyByUserId(this.userId, propertyId).subscribe(() => {
          this.listedProperties.splice(index, 1);
      })
    );
  }

}
