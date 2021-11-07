import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription, using } from 'rxjs';
import { switchMap, debounceTime, catchError, map, filter, tap } from 'rxjs/operators';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { SearchSuggestions } from '../../../models/search/search-suggestions';
import { SearchService } from '../../../../core/services/api/search-service';
import { AppContextService } from '../../../../core/services/app-context.service';
import { PopUpFiltersComponent } from '../pop-up-filters/pop-up-filters.component';
import { FormState, initialState } from '../../../models/search/search.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { delayedFormStateRecieved, formValueChange } from '../../../../core/ngxs-state-management/search/actions';
import { PropertyType } from '../../../models/listing/property-type';
import { OperationType } from '../../../models/listing/operation-type';
import { ListingService } from '../../../../core/services/api/listing.service';


@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss']
})
export class FilterSearchComponent implements OnInit {
  destroy$: Observable<void>;

  control = new FormControl();

  query$: Observable<string>;
  suggestions$: Observable<SearchSuggestions>;

  @ViewChild('search', { read: MatAutocompleteTrigger })
  autoComplete: MatAutocompleteTrigger;

  location: string;
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
  valueChanges$: any;
  formValues$: any;
  @Input() public purposeType: any;
  @Input() public propertyType: any;
  @Input() public priceFrom: any;
  @Input() public priceTo: any;
  @Input() public bedrooms: any;
  @Input() public bathrooms: any;
  @Input() public conditions: any;
  @Input() public sizeTo: any;
  @Input() public sizeFrom: any;
  @Input() public yearBuiltFrom: any;
  @Input() public yearBuiltTo: any;
  @Input() public characteristics: any;
  @Input() public mobile: any;
  subscriptions: Subscription = new Subscription();
  constructor(
    private listingService: ListingService,
    @Inject(Router) private router: Router,
    private httpClient: HttpClient,
    private appContext: AppContextService,
    public modalService: NgbModal,
    public form: FormBuilder,
    private store: Store<{ ngrx: FormState }>) { }

  ngOnInit(): void {
    this.suggestions$ = this.control.valueChanges
      .pipe(
        debounceTime(300), // Debounce time to not send every keystroke ...
        switchMap(value => this
          .getSuggestions(value)
          .pipe(catchError(() => of({ query: value, results: [] } as SearchSuggestions))))
      );
    this.suggestions$.subscribe(e => console.log(e));
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
    this.valueChanges$ = this.searchProperties.valueChanges.pipe(
      tap((values: any) => this.store.dispatch(formValueChange(values)))
    );
    this.formValues$ = using(
      () => this.valueChanges$.subscribe(),
      () => this.store.select(state => state.ngrx)
    );
  }

  public searchFunction() {
    this.router.navigate(['/search'], {
      queryParams:
      {
        purposeType: this.purposeType,
        propertyType: this.propertyType,
        priceFrom: this.priceFrom,
        priceTo: this.priceTo,
        bedrooms: this.bedrooms,
        bathrooms: this.bathrooms,
        conditions: this.conditions,
        sizeTo: this.sizeTo,
        sizeFrom: this.sizeFrom,
        yearBuiltFrom: this.yearBuiltFrom,
        yearBuiltTo: this.yearBuiltTo,
        characteristics: this.characteristics
      }
    });
  }

  onKeyupEnter(value: string): void {

    if (!!this.autoComplete) {
      this.autoComplete.closePanel();
    }
  }

  getSuggestions(query: string): Observable<SearchSuggestions> {

    if (!query) {
      return of(null);
    }

    return this.httpClient
      .get<SearchSuggestions>(this.appContext.getAPIUrl() + '/CitiesSearch/suggest', {
        params: {
          q: query
        }
      })
      .pipe(catchError((err) => {
        console.error(`An error occured while fetching suggestions: ${err}`);

        return of({ query, results: [] } as SearchSuggestions);
      }));
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
      selectedOrderIds
    ];


    modalRef.componentInstance.propertyTypes = this.propertyTypes;
    modalRef.componentInstance.operationTypes = this.operationTypes;
    modalRef.componentInstance.mobile =  this.mobile;
    modalRef.componentInstance.formSearch =  formSearch;

    modalRef.result.then(
      (result) => {
        this.searchProperties.controls.characteristics.patchValue (result[11]);        console.log(result);
      },
      () => {
      }
    );
  }

}
