import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss']
})
export class FilterSearchComponent implements OnInit {

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

  constructor(@Inject(Router) private router: Router,) { }

  ngOnInit(): void {
  }

  public search() {
    console.log(this.purposeType);
    console.log(this.propertyType);
    console.log(this.priceFrom);
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

}
