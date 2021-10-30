import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, OnInit, Inject, OnDestroy, HostListener, NgZone } from '@angular/core';

import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../../../core/authentication/auth.service';
import { MobileUtilityService } from '../../../core/services/shared/mobile-utility';
import { IWindowData } from '../../models/mobile-utility/mobile-utility';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isOnTop = true;
  public authenticated: boolean = false;
  public isMobile: boolean = false;
  private windowChangeSubscription: Subscription;
  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    const element = document.querySelector('.navbar') as HTMLElement;

    if (element && !this.isMobile){
      if (window.pageYOffset > element.clientHeight) {
          element.classList.add('navbar-inverse');
      } else {
        element.classList.remove('navbar-inverse');
      }
    }
  }


  constructor(
    private authService: AuthService,
    private scrollDispatcher: ScrollDispatcher,
    private zone: NgZone,
    @Inject(MobileUtilityService) private mobileUtilityService: MobileUtilityService) {
      this.authService.loggedInObservable
      .subscribe((res) => {
        this.authenticated = res;
      });
     }

  ngOnInit() {
    this.authenticated = this.authService.loggedInValue;
    this.windowChangeSubscription = this.mobileUtilityService.getWindowObservable().subscribe((windowChange: IWindowData) => {
      this.isMobile = !windowChange.isBiggerAsLaptop;
    });
    this.scrollDispatcher.scrolled().subscribe((event: CdkScrollable) => {
      const scroll = event.measureScrollOffset('top');
      let newIsOnTop = this.isOnTop;

      if (scroll > 0) {
        newIsOnTop = false
      } else {
        newIsOnTop = true;
      }

      if (newIsOnTop !== this.isOnTop) {
        this.zone.run(() => {
          this.isOnTop = newIsOnTop;
        });
      }
    });
  }

  public ngOnDestroy(): void {
    this.windowChangeSubscription.unsubscribe();
  }

  logout() {
    //  this.authenticated = false;
    this.authService.logout();
  }

}
