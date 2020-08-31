import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-jobs',
  templateUrl: './filter-jobs.component.html',
  styleUrls: ['./filter-jobs.component.scss']
})
export class FilterJobsComponent implements OnInit {

  public locations: string[] = ['Lisboa', 'Porto'];
  public technologies: string[] = ['Java', 'C#', '.NET'];

  constructor() { }

  ngOnInit() {
  }

}
