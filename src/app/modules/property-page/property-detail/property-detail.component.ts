import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from 'src/app/core/services/api/user.service';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { User } from 'src/app/shared/models/user/user';
import { SearchPagination } from 'src/app/shared/models/search/search-paginations';
import { SearchUser } from 'src/app/shared/models/search/search-user';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Property } from 'src/app/shared/models/listing/property';
import { ListingService } from 'src/app/core/services/api/listing.service';
import { PropertyBasic } from 'src/app/shared/models/listing/property-basic';
import { SearchProperty } from 'src/app/shared/models/search/search-property';
import { MapPoint } from 'src/app/shared/models/map/map-point';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit, OnDestroy {

  public image = "https://www.trulia.com/pictures/thumbs_6/zillowstatic/fp/0082534543178d83e75145f292ada892-full.webp";
  subscriptions: Subscription = new Subscription();
  searchProperties: SearchProperty = new SearchProperty();
  property: Property = new Property();
  promotedProperties: PropertyBasic[];
  public mapPoint: MapPoint;
  private propertyId: number;

  //Image gallery---------
  //items: string[] = [];
  mainPhoto;
  currentIndex: any = -1;
  showFlag: any = false;

  items: Array<{ image: string }> = [];

  // subscription: Subscription = new Subscription();

  constructor(
    @Inject(UserService) public userService: UserService,
    @Inject(ListingService) private listingService: ListingService,
    private appContext: AppContextService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.propertyId = params.propertyId;
      console.log(this.propertyId);
      this.subscriptions.add(
        this.listingService.getPropertyByMySqlId(this.propertyId).subscribe((res: any) => {
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
        })
      );
    });

    this.searchProperties.criteria = "15";
    this.searchProperties.priceFrom = 15;
    this.searchProperties.priceTo = 16;
    this.subscriptions.add(
      this.listingService.searchProperties(this.searchProperties).subscribe((res: any) => {
        if (res.Result.IsValid) {
          this.promotedProperties = res.Result.Data;
          // temporary hack
          // for (let item of this.promotedProperties) {
          //   item.mysqlid = 1;
          // }
        }
      })
    );

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  showLightbox(index) {
    this.currentIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }

  // setCoordinates(e: any) {
  //   this.property.Latitude = e.latitude;
  //   this.property.Longitude = e.longitude;
  // }

}
