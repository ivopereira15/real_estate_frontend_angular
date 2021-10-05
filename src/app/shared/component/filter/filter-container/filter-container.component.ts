import { Component, OnInit, Output, EventEmitter, Inject, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MobileUtilityService } from '../../../../core/services/shared/mobile-utility';
import { IWindowData } from '../../../models/mobile-utility/mobile-utility';

@Component({
  selector: 'app-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss']
})
export class FilterContainerComponent implements OnInit, OnDestroy {
  public isMobile: boolean = false;
  private windowChangeSubscription: Subscription;

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

  constructor(
    public router: Router,
    @Inject(MobileUtilityService) private mobileUtilityService: MobileUtilityService
  ) { }

  ngOnInit() {
    this.windowChangeSubscription = this.mobileUtilityService.getWindowObservable().subscribe((windowChange: IWindowData) => {
      this.isMobile = !windowChange.isBiggerAsLaptop;
    });
    this.loadSessionStore();
  }

  public ngOnDestroy(): void {
    this.windowChangeSubscription.unsubscribe();
  }

  private loadSessionStore(){

  }

  purposeTypeEvent(event: any) { this.purposeType = event; }
  propertyTypeEvent(event: any) { this.propertyType = event; }
  priceFromEvent(event: any) { this.priceFrom = event; }
  priceToEvent(event: any) { this.priceTo = event; }
  bedroomsEvent(event: any) { this.bedrooms = event; }
  bathroomsEvent(event: any) { this.bathrooms = event; }
  conditionsEvent(event: any) { this.conditions = event; }
  sizeToEvent(event: any) { this.sizeTo = event; }
  sizeFromEvent(event: any) { this.sizeFrom = event; }
  yearBuiltFromEvent(event: any) { this.yearBuiltFrom = event; }
  yearBuiltToEvent(event: any) { this.yearBuiltTo = event; }
  characteristicsEvent(event: any) { this.characteristics = event; }

}
