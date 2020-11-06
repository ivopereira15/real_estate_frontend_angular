import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { MobileUtilityService } from 'src/app/core/services/shared/mobile-utility';
import { Subscription } from 'rxjs/internal/Subscription';
import { IWindowData } from '../../models/mobile-utility/mobile-utility';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public authenticated: boolean = false;
  public isMobile: boolean = false;
  private windowChangeSubscription: Subscription;

  constructor(
    private authService: AuthService,
    @Inject(MobileUtilityService) private mobileUtilityService: MobileUtilityService) {
      this.authService.loggedInObservable
      .subscribe((res) => {
        this.authenticated = res;
      });
     }

  ngOnInit() {
    this.authenticated = this.authService.loggedInValue;
    // this.authService.isAuthenticatedObservable().subscribe(res => this.authenticated = res);

    this.windowChangeSubscription = this.mobileUtilityService.getWindowObservable().subscribe((windowChange: IWindowData) => {

      this.isMobile = !windowChange.isBiggerAsLaptop;
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
