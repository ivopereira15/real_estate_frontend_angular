import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ListingService } from 'src/app/core/services/api/listing.service';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { OperationType } from 'src/app/shared/models/listing/operation-type';
import { PropertyType } from 'src/app/shared/models/listing/property-type';
import { SellHouse } from 'src/app/shared/models/listing/sell-house';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.scss']
})
export class EditListingComponent implements OnInit {


  private readonly TYPE = 'Sell';
  public title = "Sell your apartment";

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
    private authService: AuthService,
    private listingService: ListingService,
    private appContext: AppContextService) { }

  ngOnInit(): void {
    // TODO get id from route

    // call api to get the property
    this.subscriptions.add(
      this.listingService.getOperationTypes().subscribe((result) => {
        if (result.isValid) {
          this.operationTypes = result.data;
          this.currentOperationType = this.operationTypes.find(x => x.type === this.TYPE);
        }
      }));

    this.subscriptions.add(
      this.listingService.getPropertyTypes().subscribe((result) => {
        if (result.isValid) {
          this.propertyTypes = result.data;
        }
      }));

   // this.sellHouseForm = new SellHouse();
    this.userId = this.appContext.getUserId();
  }

}
