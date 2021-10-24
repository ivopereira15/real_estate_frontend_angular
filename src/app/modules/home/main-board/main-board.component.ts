import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchPagination } from '../../../shared/models/search/search-paginations';
import { PropertyBasic } from '../../../shared/models/listing/property-basic';
import { SearchUser } from '../../../shared/models/search/search-user';
import { UserService } from '../../../core/services/api/user.service';
import { HomePageService } from '../../../core/services/api/home-page.service';
import { MobileUtilityService } from '../../../core/services/shared/mobile-utility';
import { IWindowData } from '../../../shared/models/mobile-utility/mobile-utility';
import { HomePage } from '../../../shared/models/home/home-page';

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
  subscriptions: Subscription = new Subscription();
  // chunkArray: Array<User[]> = [];

  hotPropertiesToBuy: PropertyBasic[] = [];
  newApartmentsToBuy: PropertyBasic[] = [];
  newRoomsToRent: PropertyBasic[] = [];

  loadedHotPropertiesToBuy = false;
  loadedNewApartmentsToBuy = false;
  loadedNewRoomsToRent = false;

  public isMobile = false;
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
    @Inject(HomePageService) private homePageService: HomePageService,
    @Inject(MobileUtilityService) private mobileUtilityService: MobileUtilityService,
    public modalService: NgbModal) { }

  ngOnInit() {
    this.windowChangeSubscription = this.mobileUtilityService.getWindowObservable().subscribe((windowChange: IWindowData) => {
      this.isMobile = !windowChange.isBiggerAsLaptop;
    });
    this.populateItems();

    this.subscriptions.add(
      this.homePageService.getHomePage().subscribe((res: any) => {
        console.log(res);
        if (res.IsValid) {
          const result: HomePage = res.Data;

          this.hotPropertiesToBuy = result.HotPropertiesToBuy;
          this.loadedHotPropertiesToBuy = true;

          this.newApartmentsToBuy = result.NewApartmentsToBuy;
          this.loadedNewApartmentsToBuy = true;

          this.newRoomsToRent = result.NewRoomsToRent;
          this.loadedNewRoomsToRent = true;

        } else {
          this.loadedNewRoomsToRent = true;
          this.loadedNewApartmentsToBuy = true;
          this.loadedHotPropertiesToBuy = true;
        }
      })
    );

    // Test stuff search
    // this.searchPagination.PageNumber = 1;
    // this.searchPagination.RowsPerPage = 10;
    // this.searchPagination.OrderBy = 'Email';
    // let testUser = { email: '', username: '', name: '' } as SearchUser;
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
      icon: 'apartment',
      title: 'Buy',
      description: 'Find your dream home among our list of houses',
      buttonText: 'Buy your dream house',
    };

    const item2 = {
      icon: 'location_city',
      title: 'Sell',
      description: 'Find the best seller for your home',
      buttonText: 'Sell at the best price',
    };

    const item3 = {
      icon: 'home',
      title: 'Rent',
      description: 'Explore our best options in the market',
      buttonText: 'Find a room ',
    };


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


