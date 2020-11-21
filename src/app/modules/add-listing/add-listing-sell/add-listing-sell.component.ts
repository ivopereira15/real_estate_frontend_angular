import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  public uploadImage(image: any): void {
    // let uploadedImage: File = image.target.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(image.target.files[0]);
    reader.onload = (_event) => {
      let result = reader.result;
      this.thumbnails.push(result);
    };
  }

}
