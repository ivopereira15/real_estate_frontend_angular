import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ListingService } from 'src/app/core/services/api/listing.service';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { Property } from '../models/listing/property';
import { PropertyBasic } from '../models/listing/property-basic';
import { SellHouse } from '../models/listing/sell-house';
import { PropertyDetailsComponent } from '../property-details/property-details.component';


@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  property: Property = new Property();
  promotedProperties: PropertyBasic[];
  destroy = new Subject<any>();
  items: Array<{ image: string }> = [];
  constructor(
    public modalService: NgbModal,
    public route: ActivatedRoute,
    public router: Router,
    private listingService: ListingService,
    private appContext: AppContextService) {

    }
  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy)) .subscribe(params => {
      if (params.id) {
        this.listingService.getPropertyByMySqlId(params.id).subscribe((res: any) => {
          console.log(res);
          if (res.Result.IsValid) {
            this.property = res.Result.Data;
            const modalRef = this.modalService.open(
              PropertyDetailsComponent,
              { size: 'xl', centered: true, windowClass: 'modal-simple' }
              );
            modalRef.componentInstance.property = this.property;
            modalRef.result.then(
              () => {},
              () => {
                this.router.navigate(['..']);
              }
            );
          }
        });
      }
    });


  }

}
