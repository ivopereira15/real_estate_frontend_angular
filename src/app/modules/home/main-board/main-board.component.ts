import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PropertyDetailsComponent } from 'src/app/shared/property-details/property-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MobileUtilityService } from 'src/app/core/services/shared/mobile-utility';
import { IWindowData } from 'src/app/shared/models/mobile-utility/mobile-utility';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.scss']
})
export class MainBoardComponent implements OnInit, OnDestroy {

  // public users: User[];
  @ViewChild('widgetsContent1') widgetsContent1: ElementRef;
  @ViewChild('widgetsContent2') widgetsContent2: ElementRef;
  @ViewChild('widgetsContent3') widgetsContent3: ElementRef;
  @Input() public arrow: boolean;
  searchPagination: SearchPagination<SearchUser> = new SearchPagination<SearchUser>();
  searchProperties: SearchProperty = new SearchProperty();
  subscriptions: Subscription = new Subscription();
  // chunkArray: Array<User[]> = [];
  promotedProperties: PropertyBasic[] = [];
  newListings: PropertyBasic[] = [];
  allListings: PropertyBasic[] = [];

  loadedPromtedProperties: boolean = false;
  loadedNewListings: boolean = false;
  loadedAllListings: boolean = false;
  public isMobile: boolean = false;
  public items: Array<
  { icon: string, 
    title: string,
    description: string,
    buttonText: string
   }
  > = [];
  private windowChangeSubscription: Subscription;
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(ListingService) private listingService: ListingService,
    @Inject(MobileUtilityService) private mobileUtilityService: MobileUtilityService,
    public modalService: NgbModal) { }

  ngOnInit() {
    this.windowChangeSubscription = this.mobileUtilityService.getWindowObservable().subscribe((windowChange: IWindowData) => {
      this.isMobile = !windowChange.isBiggerAsLaptop;
    });
    this.populateItems();

    // Properties search Init
    this.searchProperties.criteria = "1";
    this.searchProperties.priceFrom = 1;
    this.searchProperties.priceTo = 200000;
    this.subscriptions.add(
      this.listingService.searchProperties(this.searchProperties).subscribe((res: any) => {
        console.log(res);
        if (res.Result.IsValid) {
          let result = res.Result.Data;

          //Just first 4 properties in the row. Later to make an endpoint for that
          for (let i: number = 0; i <= 8; i++) {
            if (result[i] !== undefined) {
              this.promotedProperties.push(result[i]);

              this.newListings.push(result[i]);

              this.loadedAllListings = true;
              this.allListings.push(result[i]);
            }
            
            this.loadedNewListings = true;
            this.loadedPromtedProperties = true;
          }

        } else {
          this.loadedAllListings = true;
          this.loadedNewListings = true;
          this.loadedPromtedProperties = true;
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

  populateItems(): void {
    const item1 = {
      icon: "apartment",
      title: "Buy",
      description: "Find your dream home among our list of houses",
      buttonText: "Buy your dream house",
    };

    const item2 = {
      icon: "location_city",
      title: "Sell",
      description: "Find the best seller for your home",
      buttonText: "Sell at the best price",
    }

    const item3 = {
      icon: "home",
      title: "Rent",
      description: "Explore our best options in the market",
      buttonText: "Find a room ",
    }

    
    this.items.push(item1);
    this.items.push(item2);
    this.items.push(item3);
  }

  scrollLeft(){
    this.widgetsContent2.nativeElement.scrollLeft -= 150;
  }

  scrollRight(){
    this.widgetsContent2.nativeElement.scrollLeft += 150;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  fireEvent(e) {
    e.stopPropagation();
    return false;
  }
}
