import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from 'src/app/core/services/api/user.service';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { User } from 'src/app/shared/models/user/user';
import { Job } from 'src/app/shared/models/user/job';
import { Education } from 'src/app/shared/models/user/education';
import { SearchPagination } from 'src/app/shared/models/search/search-paginations';
import { SearchUser } from 'src/app/shared/models/search/search-user';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {

  searchPagination: SearchPagination<SearchUser> = new SearchPagination<SearchUser>();
  public users: User[];
  public user: User;
  public image = "https://akns-images.eonline.com/eol_images/Entire_Site/2011822/425.sevenyears.lc.092211.jpg?fit=around|600:467&crop=600:467;center,top&output-quality=90";
  subscriptions: Subscription = new Subscription();

  private userId: string;

  constructor(
    @Inject(UserService) public userService: UserService,
    private appContext: AppContextService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.initializeEmptyUser();
    this.route.params.subscribe(params => {
      this.userId = params.email;
      this.subscriptions.add(
        this.userService.getUserByEmail(this.userId).subscribe(res => {
          if (res.isValid) {
            this.user = res.data;
          }
        })
      );
      console.log(this.userId);
    });

    // Test stuff search
    this.searchPagination.PageNumber = 1;
    this.searchPagination.RowsPerPage = 10;
    this.searchPagination.OrderBy = "Email";
    let testUser = { email: "", username: "", name: "" } as SearchUser;
    this.searchPagination.RestrictionCriteria = testUser;

    this.subscriptions.add(
      this.userService.searchUsers(this.searchPagination).subscribe(res => {
        if (res.isValid) {
          this.users = res.data;
        }
      })
    );
  }

  initializeEmptyUser() {
    this.user = new User();
    const job: Job = new Job();
    this.user.jobs = [];
    this.user.jobs.push(job);
    const education: Education = new Education();
    this.user.educations = [];
    this.user.educations.push(education);
  }

}
