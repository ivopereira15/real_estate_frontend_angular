import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from 'src/app/core/services/api/user.service';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { User } from 'src/app/shared/models/user/user';
import { SearchPagination } from 'src/app/shared/models/search/search-paginations';
import { SearchUser } from 'src/app/shared/models/search/search-user';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Property } from 'src/app/shared/models/listing/property';
import { ListingService } from 'src/app/core/services/api/listing.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit, OnDestroy {

  public image = "https://www.trulia.com/pictures/thumbs_6/zillowstatic/fp/0082534543178d83e75145f292ada892-full.webp";
  subscriptions: Subscription = new Subscription();
  property: Property = new Property();
  private propertyId: number;
  subscription: Subscription = new Subscription();

  constructor(
    @Inject(UserService) public userService: UserService,
    @Inject(ListingService) private listingService: ListingService,
    private appContext: AppContextService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.propertyId = params.propertyId;
      console.log(this.propertyId);
      this.subscription.add(
        this.listingService.getPropertyByMySqlId(this.propertyId).subscribe((res: any) => {
          console.log(res);
          if(res.Result.IsValid){
             this.property = res.Result.Data;
             console.log(this.property);
          }
        })
      );
    });
    // this.property = history.state.data;
    // console.log(this.property)

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
