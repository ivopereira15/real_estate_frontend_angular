import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PropertyDetailsComponent } from '../property-details/property-details.component';


@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {
  destroy = new Subject<any>();
  constructor(
    public modalService: NgbModal,
    public route: ActivatedRoute,
    public router: Router) {

    }
  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy)) .subscribe(params => {
      console.log(params.id);
    });
    const modalRef = this.modalService.open(
      PropertyDetailsComponent,
      { size: 'xl', centered: true, windowClass: 'modal-simple' }
      );
      // modalRef.componentInstance.id = id;
    modalRef.result.then(
      () => {},
      () => {
        this.router.navigate(['..']);
      }
      );

  }

}
