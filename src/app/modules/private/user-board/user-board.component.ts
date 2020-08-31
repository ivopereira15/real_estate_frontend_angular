import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/models/user/user';
import { Job } from 'src/app/shared/models/user/job';
import { Education } from 'src/app/shared/models/user/education';
import { UserService } from 'src/app/core/services/api/user.service';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { Subscription } from 'rxjs';
import { Technology } from 'src/app/shared/models/user/technologies';
import { Language } from 'src/app/shared/models/user/language';
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
  ) {}

  ngOnInit() {

    this.initializeEmptyUser();
    // TODO get data from DB to fullfill user.ts getThisUser();
    const userEmail = this.appContext.getUserEmail();
    this.subscriptions.add(
      this.userService.getUserByEmail(userEmail).subscribe(res => {

        if (res.isValid) {

          this.user = res.data;
          this.active = this.user.active;
          if (this.user.jobs.length === 0) {
            const job: Job = new Job();
            this.user.jobs = [];
            this.user.jobs.push(job);
          }
        }

      })
    );

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  initializeEmptyUser() {
    this.user = new User();

    const job: Job = new Job();
    this.user.jobs = [];
    this.user.jobs.push(job);
  }

  addJob(): void {
    const job: Job = new Job();
    this.user.jobs.push(job);
  }

  addEducation(): void {
    const education: Education = new Education();
    this.user.educations.push(education);
  }

  addTechnology(): void {
    const technology: Technology = new Technology();
    this.user.technologies.push(technology);
  }

  addLanguage(): void {
    const language: Language = new Language();
    this.user.languages.push(language);
  }


  deleteJob(job: Job): void {
    const index = this.user.jobs.indexOf(job, 0);
    if (index > -1) {
      this.user.jobs.splice(index, 1);
    }
  }

  deleteEducation(education: Education): void {
    const index = this.user.educations.indexOf(education, 0);
    if (index > -1) {
      this.user.educations.splice(index, 1);
    }
  }

  deleteTechnology(technology: Technology): void {
    const index = this.user.technologies.indexOf(technology, 0);
    if (index > -1) {
      this.user.technologies.splice(index, 1);
    }
  }

  deleteLanguage(language: Language): void {
    const index = this.user.languages.indexOf(language, 0);
    if (index > -1) {
      this.user.languages.splice(index, 1);
    }
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
    if (this.user.coutry === undefined || this.user.coutry === '') {
      return false;
    }

    if (this.user.jobs === undefined || this.user.jobs === [] || this.user.jobs === null) {
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
    if (this.user.coutry === undefined || this.user.coutry === '') {
      return false;
    }
    let jobCheck = true;
    this.user.jobs.forEach(job => {
      if (job.position === undefined || job.position === '') {
        jobCheck = false;
      }
    });
    if (!jobCheck) {
      return false;
    }

    let educationCheck = true;
    this.user.educations.forEach(education => {
      if (education.course === undefined || education.course === '') {
        educationCheck = false;
      }
    });
    if (!educationCheck) {
      return false;
    }

    let technologyCheck = true;
    this.user.technologies.forEach(technology => {
      if (technology.name === undefined || technology.name === '') {
        technologyCheck = false;
      }
    });
    if (!technologyCheck) {
      return false;
    }

    let languageCheck = true;
    this.user.languages.forEach(language => {
      if (language.name === undefined || language.name === '') {
        languageCheck = false;
      }
    });
    if (!languageCheck) {
      return false;
    }

    return true;
  }

}
