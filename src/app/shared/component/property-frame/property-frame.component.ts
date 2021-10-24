import { Component, OnInit, Input, Inject } from '@angular/core';
import { ListingService } from '../../../core/services/api/listing.service';
import { Property } from '../../models/listing/property';

@Component({
  selector: 'app-property-frame',
  templateUrl: './property-frame.component.html',
  styleUrls: ['./property-frame.component.scss']
})
export class PropertyFrameComponent implements OnInit {

  @Input() public property: Property;
  items: Array<{ image: string }> = [];
  public userTechnologies: string[];
  loading = false;

  constructor(
    @Inject(ListingService) private listingService: ListingService) { }

  ngOnInit() {
    this.loading = true;
    this.listingService.getPropertyByMySqlId(this.property.MySqlId).subscribe((res: any) => {
      if (res.Result.IsValid) {
        this.property = res.Result.Data;
        if (this.property.Images) {
          this.property.Images.forEach(i => {
            this.items.push({ image: i.ImageUrl });
          });
        }
        this.loading = false;
      }else {
        this.loading = false;
      }
    });
  }
}
