import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user/user';
import { Technology } from '../../models/user/technologies';

@Component({
  selector: 'app-devs-frame',
  templateUrl: './devs-frame.component.html',
  styleUrls: ['./devs-frame.component.scss']
})
export class DevsFrameComponent implements OnInit {

  @Input() public user: User;

  public userTechnologies: string[];
  public skills = [".NET", "Angular", "C#", "Java"];
  public image = "https://akns-images.eonline.com/eol_images/Entire_Site/2011822/425.sevenyears.lc.092211.jpg?fit=around|600:467&crop=600:467;center,top&output-quality=90";

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
