import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription, using } from 'rxjs';
import { ListingService } from '../../../../core/services/api/listing.service';
import { OperationType } from '../../../models/listing/operation-type';
import { PropertyType } from '../../../models/listing/property-type';
import { FormState, initialState } from '../../../models/search/search.model';
import { Store } from '@ngrx/store';
import { delayedFormStateRecieved, formValueChange } from '../../../../core/ngxs-state-management/search/actions';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs/operators';

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
searchProperties = this.form.group({
  location: [initialState.location],
  purposeType: [initialState.purposeType],
  propertyType: [initialState.propertyType],
  priceFrom: [initialState.priceFrom],
  priceTo: [initialState.priceTo],
  bedrooms: [initialState.bedrooms],
  bathrooms: [initialState.bathrooms],
  conditions: [initialState.conditions],
  sizeTo: [initialState.sizeTo],
  sizeFrom: [initialState.sizeFrom],
  yearBuiltFrom: [initialState.yearBuiltFrom],
  yearBuiltTo: [initialState.yearBuiltTo],
  characteristics: new FormArray([])
});


characteristicsList: any[] = [{
  id: 1,
  val: 'Balcony'
},
{
  id: 2,
  val: 'A/C'
},
{
  id: 3,
  val: 'Furniture'
},
{
  id: 4,
  val: 'Fireplate'
},
{
  id: 5,
  val: 'Hardwood'
},
{
  id: 6,
  val: 'Wheelchart access'
},
{
  id: 7,
  val: 'Garage'
},
{
  id: 8,
  val: 'Elevator'
},
{
  id: 9,
  val: 'Pool,'
},
{
  id: 10,
  val: 'Shopping'
},
{
  id: 11,
  val: 'Security'
},
{
  id: 12,
  val: 'Green Spaces'
},
{
  id: 13,
  val: 'School'
},
{
  id: 14,
  val: 'Gym'
},
{
  id: 15,
  val: 'Barbecue'
},
{
  id: 16,
  val: 'Kitchnet'
},
{
  id: 17,
  val: 'HotTube'
},
{
  id: 18,
  val: 'Pantry'
},
{
  id: 19,
  val: 'Terrace'
},
{
  id: 20,
  val: 'Electrical Blinds'
},
{
  id: 21,
  val: 'Alarm'
},
{
  id: 22,
  val: 'Ocean View'
},
{
  id: 23,
  val: 'Pets Allowed'
}
];
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
valueChanges$: any;
formValues$: any;
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

  constructor(
    private listingService: ListingService,
    public modalService: NgbModal,
    public form: FormBuilder,
    private store: Store<{ ngrx: FormState }>) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.listingService.getOperationTypes().subscribe((result) => {

        if (result.IsValid) {
          this.operationTypes = result.Data;
        }
      }));
    this.addCheckboxes();
    this.subscriptions.add(
      this.listingService.getPropertyTypes().subscribe((result) => {
        if (result.IsValid) {
          this.propertyTypes = result.Data;
        }
      }));

      this.valueChanges$ = this.searchProperties.valueChanges.pipe(
        tap((values: any) => this.store.dispatch(formValueChange(values)))
      );
      this.formValues$ = using(
        () => this.valueChanges$.subscribe(),
        () => this.store.select(state => state.ngrx)
      );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private addCheckboxes() {
    this.characteristicsList.forEach(() => this.characteristicsFormArray.push(new FormControl(false)));
  }

  get characteristicsFormArray() {
    return this.searchProperties.controls.characteristics as FormArray;
  }

}
