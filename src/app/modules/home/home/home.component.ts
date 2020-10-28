import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public toogleJobs;
  public toogleDevs;

  constructor() { }

  ngOnInit() {
  }

  // public toogJobs(event) {
  //   this.toogleJobs = event;
  // }

  public toogDevs(event) {
    this.toogleDevs = event;
  }

  close(){}

}
