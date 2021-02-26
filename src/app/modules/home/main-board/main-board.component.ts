import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/services/api/user.service';
import { SearchPagination } from 'src/app/shared/models/search/search-paginations';
import { SearchUser } from 'src/app/shared/models/search/search-user';
import { Subscription, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user/user';
import { ThrowStmt } from '@angular/compiler';
import { SearchProperty } from 'src/app/shared/models/search/search-property';
import { ListingService } from 'src/app/core/services/api/listing.service';
import { Property } from 'src/app/shared/models/listing/property';
import { PropertyBasic } from 'src/app/shared/models/listing/property-basic';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.scss']
})
export class MainBoardComponent implements OnInit, OnDestroy {

  // public users: User[];

  searchPagination: SearchPagination<SearchUser> = new SearchPagination<SearchUser>();
  searchProperties: SearchProperty = new SearchProperty();
  subscriptions: Subscription = new Subscription();
  // chunkArray: Array<User[]> = [];
  promotedProperties: PropertyBasic[];

  constructor(@Inject(UserService) private userService: UserService,
    @Inject(ListingService) private listingService: ListingService) { }

  ngOnInit() {
    // Properties search Init
    this.searchProperties.criteria = "15";
    this.searchProperties.priceFrom = 15;
    this.searchProperties.priceTo = 16;
    this.subscriptions.add(
      this.listingService.searchProperties(this.searchProperties).subscribe((res: any) => {
        if (res.Result.IsValid) {
          this.promotedProperties = res.Result.Data;
          // temporary hack
          // for (let item of this.promotedProperties) {
          //   item.mysqlid = 1;
          // }
        }
      })
    );

    // Test stuff search
    // this.searchPagination.PageNumber = 1;
    // this.searchPagination.RowsPerPage = 10;
    // this.searchPagination.OrderBy = "Email";
    // let testUser = { email: "", username: "", name: "" } as SearchUser;
    // this.searchPagination.RestrictionCriteria = testUser;

    // this.subscriptions.add(
    //   this.userService.searchUsers(this.searchPagination).subscribe(res => {
    //     if (res.IsValid) {
    //       this.users = res.Data;
    //       //
    //       // this.promotedProperties = this.users.slice(0, 4);

    //       var i, j, array, chunk = 4;
    //       for (i = 0, j = 8; i < j; i += chunk) {
    //         array = this.users.slice(i, i + chunk);
    //         // this.chunkArray.push(array);
    //       }
    //     }
    //   })
    // );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
