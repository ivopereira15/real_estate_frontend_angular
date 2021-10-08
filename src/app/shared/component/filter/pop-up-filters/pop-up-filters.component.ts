import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { using } from 'rxjs';
import { tap } from 'rxjs/operators';
import { formValueChange } from '../../../../core/ngxs-state-management/search/actions';
import { FormState, initialState } from '../../../models/search/search.model';

@Component({
  selector: 'app-pop-up-filters',
  templateUrl: './pop-up-filters.component.html',
  styleUrls: ['./pop-up-filters.component.scss']
})
export class PopUpFiltersComponent implements OnInit {
  public bedroomsQuantity: string[] = ['T0', 'T1', 'T2', 'T3', 'T4'];
  public bathroomsQuantity: string[] = ['1', '2', '3', '4', '5'];
  public conditionTypes: string[] = ['Old', 'New', 'Needs Reconstruction', 'Under Construction'];
  characteristics: any = {};
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
  @Input() public propertyTypes: any;
  @Input() public operationTypes: any;
  @Input() public mobile: any;
  @Input() public formSearch: any;
  searchMoreProperties = this.form.group({
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
  valueChanges$: any;
  formValues$: any;

  constructor(
    public form: FormBuilder,
    public activeModal: NgbActiveModal,
    public cdRef: ChangeDetectorRef,
    private store: Store<{ ngrx: FormState }>) { }

  ngOnInit(): void {

    this.valueChanges$ = this.searchMoreProperties.valueChanges.pipe(
      tap((values: any) => this.store.dispatch(formValueChange(values)))
    );
    this.formValues$ = using(
      () => this.valueChanges$.subscribe(),
      () => this.store.select(state => state.ngrx)
    );
    this.addCheckboxes();

    if (this.formSearch){
      this.searchMoreProperties.controls.characteristics.patchValue(this.formSearch[11]);
    }

  }

  private addCheckboxes() {
    this.characteristicsList.forEach(() => this.characteristicsFormArray.push(new FormControl(false)));
  }

  get c() {
    return this.searchMoreProperties as FormGroup;
  }

  get characteristicsFormArray() {
    return this.searchMoreProperties.controls.characteristics as FormArray;
  }


  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }
  public searchFunction() {
    const selectedOrderIds = this.searchMoreProperties.value.characteristics
    .map((v, i) => v ? this.characteristicsList[i].id : null)
    .filter(v => v !== null);

    let response: any = [];
    response = [
      selectedOrderIds
    ];
    this.activeModal.close(
      response
    );
  }
}
