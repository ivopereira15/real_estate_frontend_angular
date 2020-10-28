import { Component, OnInit, Output, EventEmitter, Inject, OnDestroy } from '@angular/core';
import { MobileUtilityService } from 'src/app/core/services/shared/mobile-utility';
import { Subscription } from 'rxjs/internal/Subscription';
import { IWindowData } from 'src/app/shared/models/mobile-utility/mobile-utility';

@Component({
  selector: 'app-filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss']
})
export class FilterContainerComponent implements OnInit, OnDestroy {
  toogleJobs = false;
  toogleDevelopers = true;
  public isMobile: boolean = false;
  private windowChangeSubscription: Subscription;

  constructor(
    @Inject(MobileUtilityService) private mobileUtilityService: MobileUtilityService
  ) { }

  ngOnInit() {
    this.windowChangeSubscription = this.mobileUtilityService.getWindowObservable().subscribe((windowChange: IWindowData) => {
      this.isMobile = !windowChange.isBiggerAsLaptop;
    });
  }

  public ngOnDestroy(): void {
    this.windowChangeSubscription.unsubscribe();
  }

  public toogleFilter(type: string) {
    if (type === 'jobs') {
      this.toogleJobs = true;
      this.toogleDevelopers = false;
    } else if (type === 'developers') {
      this.toogleJobs = false;
      this.toogleDevelopers = true;
    }
  }

}
