import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/services/api/user.service';
import { SearchPagination } from 'src/app/shared/models/search/search-paginations';
import { SearchUser } from 'src/app/shared/models/search/search-user';
import { Subscription, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user/user';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.scss']
})
export class MainBoardComponent implements OnInit, OnDestroy {

  public users: User[];

  searchPagination: SearchPagination<SearchUser> = new SearchPagination<SearchUser>();
  subscriptions: Subscription = new Subscription();
  chunkArray: Array<User[]> = [];
  promotedProperties: any;

  constructor(@Inject(UserService) private userService: UserService) { }

  ngOnInit() {
    // Test stuff search
    this.searchPagination.PageNumber = 1;
    this.searchPagination.RowsPerPage = 10;
    this.searchPagination.OrderBy = "Email";
    let testUser = { email: "", username: "", name: "" } as SearchUser;
    this.searchPagination.RestrictionCriteria = testUser;

    this.subscriptions.add(
      this.userService.searchUsers(this.searchPagination).subscribe(res => {
        if (res.isValid) {
          console.log(res);
          this.users = res.data;
          //
          this.promotedProperties = this.users.slice(0, 4);

          var i, j, array, chunk = 4;
          for (i = 0, j = 8; i < j; i += chunk) {
            array = this.users.slice(i, i + chunk);
            this.chunkArray.push(array);
          }
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
