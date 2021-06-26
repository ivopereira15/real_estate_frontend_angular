import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatPaginatorIntl, PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { ListingService } from 'src/app/core/services/api/listing.service';
import { PropertyStateEnum } from 'src/app/shared/enums/property-state';
import { PropertyBasic } from 'src/app/shared/models/listing/property-basic';
import { SearchPropertyForAdminRequest } from 'src/app/shared/models/listing/search-property-admin';
import { SearchPagination } from 'src/app/shared/models/search/search-paginations';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  searchPagination: SearchPagination<SearchPropertyForAdminRequest> = new SearchPagination<SearchPropertyForAdminRequest>();
  subscription: Subscription = new Subscription();
  selectedType: PropertyStateEnum = PropertyStateEnum.NotApproved;
  properties: any;
  length: any;
  displayedColumns: string[] = ['mySqlId', 'price', 'deleteButton'];
  dataSource = new MatTableDataSource<PropertyBasic>();
  pageEvent: PageEvent;

  constructor(@Inject(ListingService) private listingService: ListingService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.onSubmit();
  }

  onSubmit() {
    let term: SearchPropertyForAdminRequest = new SearchPropertyForAdminRequest();
    term.Type = this.selectedType;
    this.searchPagination.PageNumber = 1;//this.paginator.pageIndex;
    this.searchPagination.RowsPerPage = 10; //this.paginator.pageSize;
    this.searchPagination.RestrictionCriteria = term;
    this.subscription.add(this.listingService.searchPropertiesForAdmin(this.searchPagination).subscribe((res: any) => {
      if (res.Result.IsValid) {
        this.dataSource.data = res.Result.Data.Properties
        // this.properties = res.Result.Data.Properties;
        this.length = res.Result.Data.TotalItems;
      }
    }
    ));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public pageChange(e?: PageEvent) {
    this.paginator.pageIndex = e.pageIndex;
    this.paginator.pageSize = e.pageSize;
    this.onSubmit();
  }

}
