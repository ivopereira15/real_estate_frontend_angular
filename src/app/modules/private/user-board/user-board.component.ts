import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/models/user/user'
import { UserService } from 'src/app/core/services/api/user.service';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormArray, FormBuilder, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { UserProfileImage } from 'src/app/shared/models/images/user-profile-image';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { AddUserType } from "src/app/core/ngxs-state-management/user.actions";

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.scss']
})
export class UserBoardComponent implements OnInit, OnDestroy {

  public image;//"https://akns-images.eonline.com/eol_images/Entire_Site/2011822/425.sevenyears.lc.092211.jpg?fit=around|600:467&crop=600:467;center,top&output-quality=90";
  public user: User;
  public technologiesExample: string[] = ['Java', 'C#', '.NET'];
  public active: boolean = true;
  technologyYears: number[] = [1, 2, 3, 4, 5];
  subscriptions: Subscription = new Subscription();
  loading: boolean;

  toogleName: boolean = true;
  toogleAddress: boolean = true;
  toogleEmail: boolean = true;
  tooglePhoneNumber: boolean = true;
  tooglePassword: boolean = true;

  constructor(
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(UserService) private userService: UserService,
    private appContext: AppContextService,
    private sanitizer: DomSanitizer,
    private store: Store
  ) { }

  ngOnInit() {
    this.loading = true;
    this.initializeEmptyUser();
    // TODO get data from DB to fullfill user.ts getThisUser();
    const userEmail = this.appContext.getUserEmail();
    this.subscriptions.add(
      this.userService.getUserByEmail(userEmail).subscribe(res => {
        console.log(res)

        if (res.IsValid) {
          console.log(res)
          this.user = res.Data;
          this.active = this.user.Active;
          if (this.user.ImagePath != undefined) {
            this.setUserProfilePhotoFromCloud(this.user.ImagePath);
          }
          // TODO check how to move to login
          this.appContext.setUserId(this.user.Id);
          this.store.dispatch(new AddUserType(this.user.Type));
          this.loading = false;
        }

      })
    );
  }

  public setUserProfilePhotoFromCloud(url: string) {
    this.userService.downloadPhotoFromAzure(url).subscribe(profilePhoto => {
      console.log(profilePhoto);
      if (profilePhoto != undefined) {
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(profilePhoto);
        reader.onloadend = () => {
          let base64data = reader.result;
          this.image = this.sanitizer.bypassSecurityTrustUrl(base64data.toString());
          //this.image = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + base64data);
          //this.image = base64data;
        }
      }
    });
  }

  public uploadImage(image: any): void {
    let uploadedImage: File = image.target.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(uploadedImage);
    reader.onload = (_event) => {
      let result = reader.result;
      this.image = result;
      const userProfileImage = new UserProfileImage();
      userProfileImage.UserEmail = this.user.Email;
      userProfileImage.ImageName = uploadedImage.name;
      userProfileImage.FileMimeType = uploadedImage.type;
      userProfileImage.Photo = uploadedImage;
      this.userService.uploadUserProfilePhoto(userProfileImage).subscribe();
    };
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  initializeEmptyUser() {
    this.user = new User();
  }

  save(): void {
    const validated = this.validationUser();
    console.log(this.user.Active);
    if (!this.user.Active) {
      const activated = this.validateActivation();
      if (activated) {
        this.user.Active = true;
        this.active = true;
      }
    }
    console.log(this.user.Active);
    if (validated) {
      this.userService.updateUser(this.user).subscribe();
    }

  }

  toogle_name() {
    this.toogleName = !this.toogleName;
  }

  toogle_address() {
    this.toogleAddress = !this.toogleAddress;
  }

  toogle_email() {
    this.toogleEmail = !this.toogleEmail;
  }

  toogle_phoneNumber() {
    this.tooglePhoneNumber = !this.tooglePhoneNumber;
  }

  toogle_password() {
    this.tooglePassword = !this.tooglePassword;
  }

  private validateActivation() {
    if (this.user.Name === undefined || this.user.Name === '') {
      return false;
    }
    if (this.user.Surname === undefined || this.user.Surname === '') {
      return false;
    }
    if (this.user.City === undefined || this.user.City === '') {
      return false;
    }
    if (this.user.Country === undefined || this.user.Country === '') {
      return false;
    }
    return true;
  }

  private validationUser(): boolean {
    if (this.user.Name === undefined || this.user.Name === '') {
      return false;
    }
    if (this.user.Surname === undefined || this.user.Surname === '') {
      return false;
    }
    if (this.user.City === undefined || this.user.City === '') {
      return false;
    }
    if (this.user.Country === undefined || this.user.Country === '') {
      return false;
    }
    return true;
  }

}
