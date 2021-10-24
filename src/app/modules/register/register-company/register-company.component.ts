import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MobileUtilityService } from '../../../core/services/shared/mobile-utility';
import { IWindowData } from '../../../shared/models/mobile-utility/mobile-utility';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss']
})
export class RegisterCompanyComponent implements OnInit {

  public locations: string[] = ['Lisboa', 'Porto'];
  public confirmPassword = false;
  public isMobile = false;
  private windowChangeSubscription: Subscription;
  constructor( @Inject(MobileUtilityService) private mobileUtilityService: MobileUtilityService) { }

  ngOnInit() {
    this.windowChangeSubscription = this.mobileUtilityService.getWindowObservable().subscribe((windowChange: IWindowData) => {
      this.isMobile = !windowChange.isBiggerAsLaptop;
    });
  }

  public confirmPasswordDialog(){
    this.confirmPassword = true;
  }

}
