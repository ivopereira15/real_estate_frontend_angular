import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/models/user/user';
import { UserService } from 'src/app/core/services/api/user.service';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormArray, FormBuilder, ValidatorFn, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.scss']
})
export class UserBoardComponent implements OnInit, OnDestroy {

  public image = "https://akns-images.eonline.com/eol_images/Entire_Site/2011822/425.sevenyears.lc.092211.jpg?fit=around|600:467&crop=600:467;center,top&output-quality=90";
  public user: User;
  public technologiesExample: string[] = ['Java', 'C#', '.NET'];
  public active: boolean = true;
  technologyYears: number[] = [1, 2, 3, 4, 5];
  subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(UserService) public userService: UserService, private appContext: AppContextService,
  ) { }

  ngOnInit() {

    this.initializeEmptyUser();
    // TODO get data from DB to fullfill user.ts getThisUser();
    const userEmail = this.appContext.getUserEmail();
    this.subscriptions.add(
      this.userService.getUserByEmail(userEmail).subscribe(res => {

        if (res.isValid) {

          this.user = res.data;
          this.active = this.user.active;
        }

      })
    );

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  initializeEmptyUser() {
    this.user = new User();
  }

  save(): void {
    const validated = this.validationUser();
    console.log(this.user.active);
    if (!this.user.active) {
      const activated = this.validateActivation();
      if (activated) {
        this.user.active = true;
        this.active = true;
      }
    }
    console.log(this.user.active);
    if (validated) {
      console.log('sdsdsdsd');
      this.userService.updateUser(this.user).subscribe();
    }

  }

  private validateActivation() {
    if (this.user.name === undefined || this.user.name === '') {
      return false;
    }
    if (this.user.surname === undefined || this.user.surname === '') {
      return false;
    }
    if (this.user.city === undefined || this.user.city === '') {
      return false;
    }
    if (this.user.country === undefined || this.user.country === '') {
      return false;
    }
    return true;
  }

  private validationUser(): boolean {
    if (this.user.name === undefined || this.user.name === '') {
      return false;
    }
    if (this.user.surname === undefined || this.user.surname === '') {
      return false;
    }
    if (this.user.city === undefined || this.user.city === '') {
      return false;
    }
    if (this.user.country === undefined || this.user.country === '') {
      return false;
    }
    return true;
  }

}
