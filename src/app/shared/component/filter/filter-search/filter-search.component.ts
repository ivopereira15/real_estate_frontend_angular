import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, debounceTime, catchError, map, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { SearchSuggestions } from '../../../models/search/search-suggestions';
import { SearchService } from '../../../../core/services/api/search-service';
import { AppContextService } from '../../../../core/services/app-context.service';


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

  constructor(
    @Inject(Router) private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private dialog: MatDialog,
    private httpClient: HttpClient,
    private appContext: AppContextService) { }

  ngOnInit(): void {
    this.suggestions$ = this.control.valueChanges
      .pipe(
        debounceTime(300), // Debounce time to not send every keystroke ...
        switchMap(value => this
          .getSuggestions(value)
          .pipe(catchError(() => of({ query: value, results: [] } as SearchSuggestions))))
      );
    this.suggestions$.subscribe(e => console.log(e));
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
      // Get the Results from the API:
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

}
