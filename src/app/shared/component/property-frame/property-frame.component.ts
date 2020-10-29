import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user/user';
import { Technology } from '../../models/user/technologies';

@Component({
  selector: 'app-property-frame',
  templateUrl: './property-frame.component.html',
  styleUrls: ['./property-frame.component.scss']
})
export class PropertyFrameComponent implements OnInit {

  @Input() public user: User;

  public userTechnologies: string[];
  public skills = [".NET", "Angular", "C#", "Java"];
  public image = "https://www.trulia.com/pictures/thumbs_6/zillowstatic/fp/0082534543178d83e75145f292ada892-full.webp";

  constructor() { }

  ngOnInit() {
    this.fillTechnologies(this.user.technologies);
  }

  fillTechnologies(technologies: Technology[]) {
    this.userTechnologies = [];
    let technologiesArray = [...technologies];
    if (technologies.length > 4) {
      technologiesArray = technologiesArray.slice(0, 4);
    }
    for (const tech of technologiesArray) {

      this.userTechnologies.push(tech.name);
    }
  }

}
