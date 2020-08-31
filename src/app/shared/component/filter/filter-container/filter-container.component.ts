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
  @Output() public toogJobs = new EventEmitter<boolean>();
  @Output() public toogDevs = new EventEmitter<boolean>();
  toogleJobs = false;
  toogleDevelopers = true;
  public isMobile: boolean = false;
  private windowChangeSubscription: Subscription;

  constructor(
    @Inject(MobileUtilityService) private mobileUtilityService: MobileUtilityService
  ) { }

  ngOnInit() {
    this.toogJobs.emit(false);
    this.toogDevs.emit(true);
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
      this.toogJobs.emit(true);
      this.toogDevs.emit(false);
    } else if (type === 'developers') {
      this.toogleJobs = false;
      this.toogleDevelopers = true;
      this.toogJobs.emit(false);
      this.toogDevs.emit(true);
    }
  }

}
