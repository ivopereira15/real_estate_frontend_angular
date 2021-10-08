import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ImageService } from 'src/app/core/services/api/image.service';
import { ListingService } from 'src/app/core/services/api/listing.service';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { TempTokenService } from 'src/app/core/services/shared/temp-token.service';
import { OperationTypeEnum } from 'src/app/shared/enums/operation-type';
import { PropertyTypeEnum } from 'src/app/shared/enums/property-type';
import { OperationType } from 'src/app/shared/models/listing/operation-type';
import { PropertyType } from 'src/app/shared/models/listing/property-type';
import { SellHouse } from 'src/app/shared/models/listing/sell-house';

@Component({
  selector: 'app-add-listing-rent',
  templateUrl: './add-listing-rent.component.html',
  styleUrls: ['./add-listing-rent.component.scss']
})
export class AddListingRentComponent implements OnInit {

  private readonly TYPE = OperationTypeEnum.Buy; // Sell
  public title = "Rent your House";
  loading: boolean = false;

  // typology: string[] = ["T0", "T1", "T2", "T3"];
  // bathrooms: number[] = [1, 2, 3, 4, 5];
  // floors: number[] = [1, 2, 3, 4, 5];
  // energyCertificate: string[] = ["A", "B", "C", "D"];
  // countries: string[] = ["Italy", "Ukraine", "Portugal"];
  // thumbnails = [];

  sellHouseForm: SellHouse;
  operationTypes: OperationType[];
  currentOperationType: OperationType;
  propertyTypes: PropertyType[];

  userId: number; // input

  subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
    private listingService: ListingService,
    private imageService: ImageService,
    private appContext: AppContextService,
    private tempTokenService: TempTokenService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.listingService.getOperationTypes().subscribe((result) => {

        if (result.IsValid) {
          this.operationTypes = result.Data;
          this.currentOperationType = this.operationTypes.find(x => x.Type === this.TYPE);
        }
      }));

    this.subscriptions.add(
      this.listingService.getPropertyTypes().subscribe((result) => {
        if (result.IsValid) {
          this.propertyTypes = result.Data;
        }
      }));

    this.sellHouseForm = new SellHouse();
    this.userId = this.appContext.getUserId();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async publishListing(sellHouseForm: SellHouse) {
    this.loading = true;
    // Check if logged in. If yes, POST
    const isAuthnticated = this.authService.isAuthenticated();
    if (isAuthnticated) {
      sellHouseForm.UserId = this.userId;
      sellHouseForm.OperationTypeId = this.currentOperationType.Id;
      sellHouseForm.PropertyType = PropertyTypeEnum.House;
      console.log(sellHouseForm);
      this.listingService.listSellHouse(sellHouseForm).subscribe(res => {
        if (res.IsValid) {
          this.imageService.AddPropertyPhoto(sellHouseForm.photos, res.Data).subscribe(res => {
            this.loading = false;
            this.router.navigate(['/publish-success']);

          });
        } else {
          // TODO Error Page
        }
      });
    }
    if (!isAuthnticated) {
      this.loading = false;
      // temp save
      var tempId = Guid.create();
      sellHouseForm.OperationTypeId = this.currentOperationType.Id;
      console.log(sellHouseForm);
      this.listingService.listTempSellHouse(tempId, sellHouseForm).subscribe(res => {
        if (res.IsValid) {
          this.imageService.AddPropertyTempPhoto(sellHouseForm.photos, res.Data).subscribe(res => {
            this.loading = false;
            console.log(tempId);
            this.tempTokenService.setPublicToken(tempId);
            this.router.navigate(['/redirect']);
          });
        }
      });
    }
    // If not cache the request, then update
  }

}
