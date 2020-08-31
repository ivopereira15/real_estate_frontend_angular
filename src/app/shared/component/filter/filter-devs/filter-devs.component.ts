import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-devs',
  templateUrl: './filter-devs.component.html',
  styleUrls: ['./filter-devs.component.scss']
})
export class FilterDevsComponent implements OnInit {

public locations: string[] = ['Lisboa', 'Porto'];
public technologies: string[] = ['Java', 'C#', '.NET'];

  constructor() { }

  ngOnInit() {
  }

}
