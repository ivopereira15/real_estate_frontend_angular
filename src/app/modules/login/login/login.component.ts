import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AccountService } from '../../../core/services/api/account.service';
import { AppContextService } from '../../../core/services/app-context.service';
import { AuthService } from '../../../core/authentication/auth.service';
import { TempTokenService } from '../../../core/services/shared/temp-token.service';
import { ResultMessage } from '../../../shared/models/result-message/result-message';
import { MobileUtilityService } from '../../../core/services/shared/mobile-utility';
import { Subscription } from 'rxjs';
import { IWindowData } from '../../../shared/models/mobile-utility/mobile-utility';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public tempId: any;
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required]),
    password: new FormControl('', [
      Validators.required])
  });
  loadingButton = false;
  public isMobile = false;
  private windowChangeSubscription: Subscription;
  constructor(
    @Inject(MobileUtilityService) private mobileUtilityService: MobileUtilityService,
    private accountService: AccountService,
    private appContext: AppContextService,
    private authService: AuthService,
    private router: Router,
    private tempTokenService: TempTokenService) {

  }

  ngOnInit() {
    this.windowChangeSubscription = this.mobileUtilityService.getWindowObservable().subscribe((windowChange: IWindowData) => {
      this.isMobile = !windowChange.isBiggerAsLaptop;
    });
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.loadingButton = true;
      this.tempId = this.tempTokenService.token;
      console.log(this.tempId);
      this.accountService.getJwtToken(this.email, this.password, this.tempId).subscribe(
        (resultMessage: ResultMessage<string>) => {
          if (resultMessage.IsValid) {
            const token: string = resultMessage.Data;
            this.appContext.setToken(token);

            this.authService.loggedInSubject.next(true);
            // this.authService.authChanged.emit(true);

            // TODO call here GetThisUserAsync()
            this.appContext.setUserEmail(this.email);
            this.tempTokenService.destroyPublicToken();
            this.loadingButton = false;
            this.router.navigate(['/userboard']);
          }
        },
        (httpErrorResponse: HttpErrorResponse) => {
          this.tempTokenService.destroyPublicToken();
          this.loadingButton = false;
          console.log(httpErrorResponse);
          // TODO add errors to array and display
        });
    }
  }

  goToResigter() {
    this.router.navigate(['/register'], { queryParams: { q: this.tempId } });
  }

}
