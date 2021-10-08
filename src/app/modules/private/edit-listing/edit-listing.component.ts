import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ListingService } from 'src/app/core/services/api/listing.service';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { OperationType } from 'src/app/shared/models/listing/operation-type';
import { PropertyType } from 'src/app/shared/models/listing/property-type';
import { SellHouse } from 'src/app/shared/models/listing/sell-house';
import { Router, ActivatedRoute } from '@angular/router';
import { MapPoint } from '../../../shared/models/map/map-point';
import { OperationTypeEnum } from 'src/app/shared/enums/operation-type';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.scss']
})
export class EditListingComponent implements OnInit, OnDestroy {

  public title = "Sell your apartment";
  private readonly TYPE =  OperationTypeEnum.Rent;


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
            if (result.IsValid) {
              this.sellHouseForm = result.Data;
            }
          })
        );

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
      }

    });

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
