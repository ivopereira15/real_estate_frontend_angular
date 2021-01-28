import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListingService } from 'src/app/core/services/api/listing.service';
import { UserService } from 'src/app/core/services/api/user.service';
import { PropertyBasic } from 'src/app/shared/models/listing/property-basic';
import { MapPoint } from 'src/app/shared/models/map/map-point';
import { SearchProperty } from 'src/app/shared/models/search/search-property';

@Component({
  selector: 'app-search-board',
  templateUrl: './search-board.component.html',
  styleUrls: ['./search-board.component.scss']
})
export class SearchBoardComponent implements OnInit, OnChanges {

  searchProperties: SearchProperty = new SearchProperty();
  subscriptions: Subscription = new Subscription();
  promotedProperties: PropertyBasic[];
  chunkArray: Array<PropertyBasic[]> = [];
  public mapPoints: MapPoint[];

  constructor(@Inject(UserService) private userService: UserService,
    @Inject(ListingService) private listingService: ListingService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchProperties.purposeType = params["purposeType"];
      this.searchProperties.propertyType = params["propertyType"];
      this.searchProperties.priceFrom = params["priceFrom"];
      this.searchProperties.priceTo = params["priceTo"];
      this.searchProperties.bedrooms = params["bedrooms"];
      this.searchProperties.bathrooms = params["bathrooms"];
      this.searchProperties.conditions = params["conditions"];
      this.searchProperties.sizeTo = params["sizeTo"];
      this.searchProperties.sizeFrom = params["sizeFrom"];
      this.searchProperties.yearBuiltFrom = params["yearBuiltFrom"];
      this.searchProperties.yearBuiltTo = params["yearBuiltTo"];
      this.searchProperties.characteristics = params["characteristics"];
    });
    // Properties search Init
    // this.searchProperties.criteria = "15";

    console.log(this.searchProperties);
    
    this.subscriptions.add(
      this.listingService.searchProperties(this.searchProperties).subscribe((res: any) => {
        if (res.Result.IsValid) {
          this.promotedProperties = res.Result.Data;
          var i, j, array, chunk = 2;
          for (i = 0, j = 8; i < j; i += chunk) {
            array = this.promotedProperties.slice(i, i + chunk);
            this.chunkArray.push(array);
          }
          this.mapPoints = this.promotedProperties.map(x => {
            let mapP = new MapPoint();
            mapP.latitude = x.Latitude;
            mapP.longitude = x.Longitude;
            // mapP.name = x.Id.toString(); // TODO change this to Name?
            return mapP;
          });
        }
      })
    );
  }

  ngOnChanges() {
    // this.mapPoint = new MapPoint();
    // this.mapPoint.latitude = 38.7166700;
    // this.mapPoint.longitude = -9.1333300;
  }

}
