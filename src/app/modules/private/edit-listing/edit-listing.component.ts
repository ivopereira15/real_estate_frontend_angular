import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ListingService } from 'src/app/core/services/api/listing.service';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { OperationType } from 'src/app/shared/models/listing/operation-type';
import { PropertyType } from 'src/app/shared/models/listing/property-type';
import { SellHouse } from 'src/app/shared/models/listing/sell-house';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.scss']
})
export class EditListingComponent implements OnInit, OnDestroy {


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
    private router: ActivatedRoute,
    private authService: AuthService,
    private listingService: ListingService,
    private appContext: AppContextService) { }

  ngOnInit(): void {
    this.sellHouseForm = new SellHouse();
    this.userId = this.appContext.getUserId();
    this.router.params.subscribe(params => {
      const propertyId = params['propertyId'];

      if (propertyId) {
        this.subscriptions.add(
          this.listingService.getPropertyByUserId(this.userId, propertyId as number).subscribe((result) => {
            console.log(result)
            if (result.isValid) {
              this.sellHouseForm = result.data;
            }
          })
        );

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
      }

    });

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
