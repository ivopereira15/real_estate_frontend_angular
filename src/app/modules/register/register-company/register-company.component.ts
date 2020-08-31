import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss']
})
export class RegisterCompanyComponent implements OnInit {

  public locations: string[] = ['Lisboa', 'Porto'];
  public confirmPassword = false;

  constructor() { }

  ngOnInit() {
  }

  public confirmPasswordDialog(){
    this.confirmPassword = true;
  }

}
