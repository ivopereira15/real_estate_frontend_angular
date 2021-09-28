import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pop-up-filters',
  templateUrl: './pop-up-filters.component.html',
  styleUrls: ['./pop-up-filters.component.scss']
})
export class PopUpFiltersComponent implements OnInit {
  public bedroomsQuantity: string[] = ['T0', 'T1', 'T2', 'T3', 'T4'];
  public bathroomsQuantity: string[] = ['1', '2', '3', '4', '5'];
  public conditionTypes: string[] = ['Old', 'New', 'Needs Reconstruction', 'Under Construction'];
  public searchMoreProperties: FormGroup;
  characteristics: any = {}
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

  constructor(
    public form: FormBuilder,
    public activeModal: NgbActiveModal, 
    public cdRef: ChangeDetectorRef) {

    
  
   }

  ngOnInit(): void {
    this.searchMoreProperties = this.form.group({
      purposeType: [''],
      propertyType: [''],
      priceFrom: [''],
      priceTo: [''],
      bedrooms: [''],
      bathrooms: [],
      conditions: [''],
      sizeTo: [''],
      sizeFrom: [''],
      yearBuiltFrom: [''],
      yearBuiltTo: [''],
      characteristics: new FormArray([])
    });
    this.addCheckboxes();

    if(this.formSearch){
      this.searchMoreProperties.controls['purposeType'].setValue(this.formSearch[0]);
      this.searchMoreProperties.controls['propertyType'].setValue(this.formSearch[1]);
      this.searchMoreProperties.controls['priceFrom'].setValue(this.formSearch[2]);
      this.searchMoreProperties.controls['priceTo'].setValue(this.formSearch[3]);
      this.searchMoreProperties.controls['bedrooms'].setValue(this.formSearch[4]);
      this.searchMoreProperties.controls['bathrooms'].setValue(this.formSearch[5]);
      this.searchMoreProperties.controls['conditions'].setValue(this.formSearch[6]);
      this.searchMoreProperties.controls['sizeTo'].setValue(this.formSearch[7]);
      this.searchMoreProperties.controls['sizeFrom'].setValue(this.formSearch[8]);
      this.searchMoreProperties.controls['yearBuiltFrom'].setValue(this.formSearch[9]);
      this.searchMoreProperties.controls['yearBuiltTo'].setValue(this.formSearch[10]);
      this.searchMoreProperties.controls['characteristics'].patchValue (this.formSearch[11]);
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
      this.searchMoreProperties.controls.purposeType.value,
      this.searchMoreProperties.controls.propertyType.value,
      this.searchMoreProperties.controls.priceFrom.value,
      this.searchMoreProperties.controls.priceTo.value,
      this.searchMoreProperties.controls.bedrooms.value,
      this.searchMoreProperties.controls.bathrooms.value,
      this.searchMoreProperties.controls.conditions.value,
      this.searchMoreProperties.controls.sizeTo.value,
      this.searchMoreProperties.controls.sizeFrom.value,
      this.searchMoreProperties.controls.yearBuiltFrom.value,
      this.searchMoreProperties.controls.yearBuiltTo.value,
      selectedOrderIds
    ]

    this.activeModal.close(
      response
    );
  }
}
