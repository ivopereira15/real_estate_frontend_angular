import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/internal/Subscription';
import { User } from '../../../shared/models/user/user';
import { UserService } from '../../../core/services/api/user.service';
import { MobileUtilityService } from '../../../core/services/shared/mobile-utility';
import { TempTokenService } from '../../../core/services/shared/temp-token.service';
import { ResultMessage } from '../../../shared/models/result-message/result-message';
import { IWindowData } from '../../../shared/models/mobile-utility/mobile-utility';


@Component({
  selector: 'app-register-private-user',
  templateUrl: './register-private-user.component.html',
  styleUrls: ['./register-private-user.component.scss']
})
export class RegisterPrivateUserComponent implements OnInit, OnDestroy {

  public locations: string[] = ['Lisboa', 'Porto'];
  public confirmPassword = false;
  public confirmPasswordInput: string;
  public newUser: User = new User();
  public tempId: any;
  userForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required]),
    lastname: new FormControl('', [
      Validators.required]),
    email: new FormControl('', [
      Validators.required, Validators.email])
  });
  passwordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required]),
    confirmPassword: new FormControl('', [
      Validators.required])
  });
  public isMobile = false;
  private windowChangeSubscription: Subscription;

  constructor(
    @Inject(UserService) public userService: UserService,
    @Inject(Router) private router: Router,
    @Inject(MobileUtilityService) private mobileUtilityService: MobileUtilityService,
    private tempTokenService: TempTokenService) { }

  ngOnInit() {

    this.windowChangeSubscription = this.mobileUtilityService.getWindowObservable().subscribe((windowChange: IWindowData) => {
      this.isMobile = !windowChange.isBiggerAsLaptop;
    });
  }

  ngOnDestroy() {
    this.windowChangeSubscription.unsubscribe();
  }

  public next(): void {
    if (this.userForm.valid) {
      this.confirmPassword = true;
    }

  }

  public createAccount() {
    if (this.passwordForm.valid) {
      if (this.newUser.Password === this.confirmPasswordInput) {
        this.tempId = this.tempTokenService.token;
        this.userService.createNewUser(this.newUser, this.tempId).subscribe(
          (resultMessage: ResultMessage<string>) => {
            if (resultMessage.IsValid) {
              this.tempTokenService.destroyPublicToken();
              this.router.navigate(['/login']);
            }
          },
          (httpErrorResponse: HttpErrorResponse) => {
            this.tempTokenService.destroyPublicToken();
            console.log(httpErrorResponse);
            // TODO add errors to array and display
          });
      } else {
        this.tempTokenService.destroyPublicToken();
        this.passwordForm.controls.confirmPassword.setErrors({
          notmatch: true,
        });
      }

    }

  }

}
