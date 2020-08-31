import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router) { }

  public ngOnInit(): void {
  }
  public goToDeveloper(): void {
    this.router.navigateByUrl('register/developer');
  }
  public goToCompany(): void {
    this.router.navigateByUrl('register/company');
  }

}
