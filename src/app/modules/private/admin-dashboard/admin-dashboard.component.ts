import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { SearchPagination } from '../../../shared/models/search/search-paginations';
import { SearchPropertyForAdminRequest } from '../../../shared/models/listing/search-property-admin';
import { PropertyStateEnum } from '../../../shared/enums/property-state';
import { ListingService } from '../../../core/services/api/listing.service';
import { PropertyBasic } from '../../../shared/models/listing/property-basic';
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
  displayedColumnsNotApproved: string[] = ['mySqlId', 'userid', 'price', 'netaream2', 'typology', 'link', 'approvebutton', 'blockbutton'];
  displayedColumnsActive: string[] = ['mySqlId', 'userid', 'price', 'netaream2', 'typology', 'link', 'blockbutton'];
  displayedColumnsBlocked: string[] = ['mySqlId', 'userid', 'price', 'netaream2', 'typology', 'link', 'approvebutton'];
  dataSource = new MatTableDataSource<PropertyBasic>();
  pageEvent: PageEvent;
  loadingButtonToApprove: boolean = false;
  loadingButtonActive: boolean = false;
  loadingButtonBlocked: boolean = false;

  constructor(@Inject(ListingService) private listingService: ListingService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.onSubmit(this.selectedType);
  }

  onSubmit(type: number) {
    this.switchLoadingButtonOn(type);
    this.selectedType = type;
    const term: SearchPropertyForAdminRequest = new SearchPropertyForAdminRequest();
    term.Type = type;
    this.searchPagination.PageNumber = 1;//this.paginator.pageIndex;
    this.searchPagination.RowsPerPage = 10; //this.paginator.pageSize;
    this.searchPagination.RestrictionCriteria = term;
    this.subscription.add(this.listingService.searchPropertiesForAdmin(this.searchPagination).subscribe((res: any) => {
      if (res.Result.IsValid) {
        console.log(res.Result.Data.Properties);
        this.dataSource.data = res.Result.Data.Properties
        // this.properties = res.Result.Data.Properties;
        this.length = res.Result.Data.TotalItems;
      }
      this.switchLoadingButtonOff(type);
    }
    ));
  }

  switchLoadingButtonOn(type: number) {
    switch (type) {
      case 0:
        break;
      case 1:
        this.loadingButtonToApprove = true;
        break;
      case 2:
        this.loadingButtonActive = true;
        break;
      case 3:
        this.loadingButtonBlocked = true;
        break;
      default:
        break;
    }
  }

  switchLoadingButtonOff(type: number) {
    switch (type) {
      case 0:
        break;
      case 1:
        this.loadingButtonToApprove = false;
        break;
      case 2:
        this.loadingButtonActive = false;
        break;
      case 3:
        this.loadingButtonBlocked = false;
        break;
      default:
        break;
    }
  }

  approve(id: number) {
    this.subscription.add(this.listingService.approveProperty(id).subscribe());
  }

  block(id: number) {
    this.subscription.add(this.listingService.blockProperty(id).subscribe());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public pageChange(e?: PageEvent) {
    this.paginator.pageIndex = e.pageIndex;
    this.paginator.pageSize = e.pageSize;
    this.onSubmit(this.selectedType);
  }

}
