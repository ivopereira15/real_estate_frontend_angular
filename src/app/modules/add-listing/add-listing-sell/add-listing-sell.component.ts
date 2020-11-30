import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ListingService } from '../../../core/services/api/listing.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { OperationType } from '../../../shared/models/listing/operation-type';
import { PropertyType } from 'src/app/shared/models/listing/property-type';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { SellHouse } from '../../../shared/models/listing/sell-house';

@Component({
  selector: 'app-add-listing-sell',
  templateUrl: './add-listing-sell.component.html',
  styleUrls: ['./add-listing-sell.component.scss']
})
export class AddListingSellComponent implements OnInit, OnDestroy {

  private readonly TYPE = 'Sell';
  public title = "Sell your apartment";

  // typology: string[] = ["T0", "T1", "T2", "T3"];
  // bathrooms: number[] = [1, 2, 3, 4, 5];
  // floors: number[] = [1, 2, 3, 4, 5];
  // energyCertificate: string[] = ["A", "B", "C", "D"];
  // countries: string[] = ["Italy", "Ukraine", "Portugal"];
  // thumbnails = [];

  sellHouseForm: SellHouse;
  operationTypes: OperationType[];
  currentOperationType: OperationType;
  propertyTypes: PropertyType[];

  userId: number; // input

  subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private listingService: ListingService,
    private appContext: AppContextService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.listingService.getOperationTypes().subscribe((result) => {
        if (result.isValid) {
          this.operationTypes = result.data;
          this.currentOperationType = this.operationTypes.find(x => x.type === this.TYPE);
        }
      }));

    this.subscriptions.add(
      this.listingService.getPropertyTypes().subscribe((result) => {
        if (result.isValid) {
          this.propertyTypes = result.data;
        }
      }));

    this.sellHouseForm = new SellHouse();
    this.userId = this.appContext.getUserId();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // public uploadImage(image: any): void {
  //   let uploadedImage: File = image.target.files[0];
  //   const reader: FileReader = new FileReader();
  //   reader.readAsDataURL(uploadedImage);
  //   reader.onload = (_event) => {
  //     let result = reader.result;
  //     this.thumbnails.push(result);
  //   };
  // }

  publishListing(sellHouseForm: SellHouse) {
    // Check if logged in. If yes, POST
    const isAuthnticated = this.authService.isAuthenticated();
    if (isAuthnticated) {
      console.log("i am logged in");
      sellHouseForm.userId = this.userId;
      sellHouseForm.operationTypeId = this.currentOperationType.id;
      console.log(this.sellHouseForm);
      this.subscriptions.add(
       this.listingService.listSellHouse(sellHouseForm).subscribe());
    }
    if (!isAuthnticated) {

    }
    // If not cache the request, then update
  }

}
