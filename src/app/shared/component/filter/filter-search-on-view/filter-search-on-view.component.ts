import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap, debounceTime, catchError, map, filter } from 'rxjs/operators';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { SearchSuggestions } from 'src/app/shared/models/search/search-suggestions';
import { SearchService } from 'src/app/core/services/api/search-service';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { ListingService } from 'src/app/core/services/api/listing.service';
import { OperationType } from 'src/app/shared/models/listing/operation-type';
import { PropertyType } from 'src/app/shared/models/listing/property-type';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopUpFiltersComponent } from '../pop-up-filters/pop-up-filters.component';
import { MobileUtilityService } from 'src/app/core/services/shared/mobile-utility';
import { IWindowData } from 'src/app/shared/models/mobile-utility/mobile-utility';

@Component({
  selector: 'app-filter-search-on-view',
  templateUrl: './filter-search-on-view.component.html',
  styleUrls: ['./filter-search-on-view.component.scss']
})
export class FilterSearchOnViewComponent implements OnInit {
  destroy$: Observable<void>;

  control = new FormControl();

  query$: Observable<string>;
  suggestions$: Observable<SearchSuggestions>;

  @ViewChild('search', { read: MatAutocompleteTrigger })
  autoComplete: MatAutocompleteTrigger;

  location: string;
  public bedroomsQuantity: string[] = ['T0', 'T1', 'T2', 'T3', 'T4'];
  public bathroomsQuantity: string[] = ['1', '2', '3', '4', '5'];
  public conditionTypes: string[] = ['Old', 'New', 'Needs Reconstruction', 'Under Construction'];
  public innerWidth: any;
  public isMobile: boolean = false;
  operationTypes: OperationType[];
  propertyTypes: PropertyType[];
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
  subscriptions: Subscription = new Subscription();

  public searchProperties: FormGroup;
  private windowChangeSubscription: Subscription;
  constructor(
    @Inject(Router) private router: Router,
    @Inject(MobileUtilityService) private mobileUtilityService: MobileUtilityService,
    private httpClient: HttpClient,
    private appContext: AppContextService,
    private listingService: ListingService,
    public modalService: NgbModal,
    public form: FormBuilder) { }

  ngOnInit(): void {
    this.windowChangeSubscription = this.mobileUtilityService.getWindowObservable().subscribe((windowChange: IWindowData) => {
      this.isMobile = !windowChange.isBiggerAsLaptop;
    });
    this.searchProperties = this.form.group({
      location: [''],
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

    this.innerWidth = window.innerWidth;
    this.suggestions$ = this.control.valueChanges
      .pipe(
        debounceTime(300), // Debounce time to not send every keystroke ...
        switchMap(value => this
          .getSuggestions(value)
          .pipe(catchError(() => of(<SearchSuggestions>{ query: value, results: [] }))))
      );
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
     this.suggestions$.subscribe(e => console.log(e));
  }

  get c() {
    return this.searchProperties as FormGroup;
  }

  public searchFunction() {
    console.log(this.searchProperties.controls.propertyType.value);

    this.router.navigate(['/search'], {
      queryParams:
      {
        purposeType: this.searchProperties.controls.purposeType.value,
        propertyType:   this.searchProperties.controls.propertyType.value,
        priceFrom:   this.searchProperties.controls.priceFrom.value,
        priceTo:  this.searchProperties.controls.priceTo.value,
        bedrooms:   this.searchProperties.controls.bedrooms.value,
        bathrooms:  this.searchProperties.controls.bathrooms.value,
        conditions:  this.searchProperties.controls.conditions.value,
        sizeTo:   this.searchProperties.controls.sizeTo.value,
        sizeFrom:   this.searchProperties.controls.sizeFrom.value,
        yearBuiltFrom:   this.searchProperties.controls.yearBuiltFrom.value,
        yearBuiltTo:  this.searchProperties.controls.yearBuiltTo.value,
        characteristics:   this.searchProperties.controls.characteristics.value,
      }
    });
  }

  private addCheckboxes() {
    this.characteristicsList.forEach(() => this.characteristicsFormArray.push(new FormControl(false)));
  }

  get characteristicsFormArray() {
    return this.searchProperties.controls.characteristics as FormArray;
  }
  openMoreSearchOptions() {
    const modalRef = this.modalService.open(
      PopUpFiltersComponent,
      { size: 'md', centered: true, windowClass: 'modal-simple' }
    );

    let formSearch: any = [];
    const selectedOrderIds = this.searchProperties.value.characteristics
    .map((v, i) => v ? this.characteristicsList[i].id : null)
    .filter(v => v !== null);
    formSearch = [
      this.searchProperties.controls.purposeType.value,
      this.searchProperties.controls.propertyType.value,
      this.searchProperties.controls.priceFrom.value,
      this.searchProperties.controls.priceTo.value,
      this.searchProperties.controls.bedrooms.value,
      this.searchProperties.controls.bathrooms.value,
      this.searchProperties.controls.conditions.value,
      this.searchProperties.controls.sizeTo.value,
      this.searchProperties.controls.sizeFrom.value,
      this.searchProperties.controls.yearBuiltFrom.value,
      this.searchProperties.controls.yearBuiltTo.value,
      selectedOrderIds
    ];


    console.log(formSearch);
    modalRef.componentInstance.propertyTypes = this.propertyTypes;
    modalRef.componentInstance.operationTypes = this.operationTypes;
    modalRef.componentInstance.mobile =  this.isMobile;
    modalRef.componentInstance.formSearch =  formSearch;

    modalRef.result.then(
      (result) => {
        this.searchProperties.controls['purposeType'].setValue(result[0]);
        this.searchProperties.controls['propertyType'].setValue(result[1]);
        this.searchProperties.controls['priceFrom'].setValue(result[2]);
        this.searchProperties.controls['priceTo'].setValue(result[3]);
        this.searchProperties.controls['bedrooms'].setValue(result[4]);
        this.searchProperties.controls['bathrooms'].setValue(result[5]);
        this.searchProperties.controls['conditions'].setValue(result[6]);
        this.searchProperties.controls['sizeTo'].setValue(result[7]);
        this.searchProperties.controls['sizeFrom'].setValue(result[8]);
        this.searchProperties.controls['yearBuiltFrom'].setValue(result[9]);
        this.searchProperties.controls['yearBuiltTo'].setValue(result[10]);
        this.searchProperties.controls['characteristics'].patchValue (result[11]);
        console.log(result);
      },
      () => {

      }
    );
  }

  onKeyupEnter(value: string): void {

    if (!!this.autoComplete) {
      this.autoComplete.closePanel();
    }
    // this.router.navigate(['/search'], { queryParams: { q: value } });
  }

  getSuggestions(query: string): Observable<SearchSuggestions> {

    if (!query) {
      return of(null);
    }

    return this.httpClient
      // Get the Results from the API:
      .get<SearchSuggestions>(this.appContext.getAPIUrl() + '/CitiesSearch/suggest', {
        params: {
          q: query
        }
      })
      .pipe(catchError((err) => {
        console.error(`An error occured while fetching suggestions: ${err}`);

        return of(<SearchSuggestions>{ query: query, results: [] })
      }));
  }

}
