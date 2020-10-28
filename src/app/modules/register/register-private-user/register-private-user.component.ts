import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/models/user/user';
import { UserService } from 'src/app/core/services/api/user.service';
import { ResultMessage } from 'src/app/shared/models/result-message/result-message';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MobileUtilityService } from 'src/app/core/services/shared/mobile-utility';
import { Subscription } from 'rxjs/internal/Subscription';
import { IWindowData } from 'src/app/shared/models/mobile-utility/mobile-utility';

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
  public isMobile: boolean = false;
  private windowChangeSubscription: Subscription;

  constructor(
    @Inject(UserService) public userService: UserService,
    @Inject(Router) private router: Router,
    @Inject(MobileUtilityService) private mobileUtilityService: MobileUtilityService) { }

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
      if (this.newUser.password === this.confirmPasswordInput) {
        this.userService.createNewUser(this.newUser).subscribe(
          (resultMessage: ResultMessage<string>) => {
            if (resultMessage.isValid) {
              this.router.navigate(['/login']);
            }
          },
          (httpErrorResponse: HttpErrorResponse) => {
            console.log(httpErrorResponse);
            // TODO add errors to array and display
          });
      } else {
        this.passwordForm.controls.confirmPassword.setErrors({
          notmatch: true,
        });
      }

    }

  }

}
