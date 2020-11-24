import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-add-listing-sell',
  templateUrl: './add-listing-sell.component.html',
  styleUrls: ['./add-listing-sell.component.scss']
})
export class AddListingSellComponent implements OnInit {

  typology: string[] = ["T0", "T1", "T2", "T3"];
  bathrooms: string[] = ["1", "2", "3", "4"];
  energyCertificate: string[] = ["A", "B", "C", "D"];
  thumbnails = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public uploadImage(image: any): void {
    let uploadedImage: File = image.target.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(uploadedImage);
    reader.onload = (_event) => {
      let result = reader.result;
      this.thumbnails.push(result);
    };
  }

  publishListing() {
    // Check if logged in. If yes, POST
    const isAuthnticated = this.authService.isAuthenticated();
    if (isAuthnticated) {
      console.log("i am logged in");
    }
    if (!isAuthnticated) {

    }
    // If not cache the request, then update
  }

}
