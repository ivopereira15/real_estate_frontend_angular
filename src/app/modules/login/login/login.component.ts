import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/api/account.service';
import { ResultMessage } from 'src/app/shared/models/result-message/result-message';
import { HttpErrorResponse } from '@angular/common/http';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required]),
    password: new FormControl('', [
      Validators.required])
  });

  constructor(private accountService: AccountService,
              private appContext: AppContextService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  public login(): void {
    if (this.loginForm.valid) {
      // change username to email
      this.accountService.getJwtToken(this.email, this.password).subscribe(
        (resultMessage: ResultMessage<string>) => {
          if (resultMessage.isValid) {
            const token: string = resultMessage.data;
            this.appContext.setToken(token);
            this.authService.authChanged.emit(true);
            // TODO call here GetThisUserAsync()
            this.appContext.setUserEmail(this.email);

            this.router.navigate(['/userboard']);
          }
          // else { this.errors = resultMessage.Errors; }
        },
        (httpErrorResponse: HttpErrorResponse) => {
          console.log(httpErrorResponse);
          // TODO add errors to array and display
        });
    }
  }

}
