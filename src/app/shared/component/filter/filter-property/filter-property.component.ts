import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListingService } from '../../../../core/services/api/listing.service';
import { OperationType } from '../../../models/listing/operation-type';
import { PropertyType } from '../../../models/listing/property-type';


@Component({
  selector: 'app-filter-property',
  templateUrl: './filter-property.component.html',
  styleUrls: ['./filter-property.component.scss']
})
export class FilterPropertyComponent implements OnInit {

//public propertyTypes: string[] = ['Apartments', 'Houses'];
//public purposeTypes: string[] = ['Buy', 'Sell', 'Rent'];
public bedroomsQuantity: string[] = ['T0', 'T1', 'T2', 'T3', 'T4'];
public bathroomsQuantity: string[] = ['1', '2', '3', '4', '5'];
public conditionTypes: string[] = ['Old', 'New', 'Needs Reconstruction', 'Under Construction'];

operationTypes: OperationType[];
propertyTypes: PropertyType[];

subscriptions: Subscription = new Subscription();

public purposeType: any;
public propertyType: any;
public priceFrom: any;
public priceTo: any;
public bedrooms: any;
public bathrooms: any;
public conditions: any;
public sizeTo: any;
public sizeFrom: any;
public yearBuiltFrom: any;
public yearBuiltTo: any;
public characteristics: any;

@Output() public purposeTypeChange = new EventEmitter();
@Output() public propertyTypeChange = new EventEmitter();
@Output() public priceFromChange = new EventEmitter();
@Output() public priceToChange = new EventEmitter();
@Output() public bedroomsChange = new EventEmitter();
@Output() public bathroomsChange = new EventEmitter();
@Output() public conditionsChange = new EventEmitter();
@Output() public sizeToChange = new EventEmitter();
@Output() public sizeFromChange = new EventEmitter();
@Output() public yearBuiltFromChange = new EventEmitter();
@Output() public yearBuiltToChange = new EventEmitter();
@Output() public characteristicsChange = new EventEmitter();

  constructor(private listingService: ListingService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.listingService.getOperationTypes().subscribe((result) => {

        if (result.IsValid) {
          this.operationTypes = result.Data;
        }
      }));

    this.subscriptions.add(
      this.listingService.getPropertyTypes().subscribe((result) => {
        if (result.IsValid) {
          this.propertyTypes = result.Data;
        }
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
