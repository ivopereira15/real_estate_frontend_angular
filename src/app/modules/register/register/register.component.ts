import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  privateUser: boolean = true;

  constructor(private router: Router) { }

  public ngOnInit(): void {
  }
  public goToPrivateUser(): void {
    this.privateUser = true;
  }
  public goToCompany(): void {
    this.privateUser = false;
  }

}
