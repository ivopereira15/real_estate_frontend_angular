import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/api/account.service';
import { ResultMessage } from 'src/app/shared/models/result-message/result-message';
import { HttpErrorResponse } from '@angular/common/http';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { map } from 'rxjs/operators';
import { TempTokenService } from 'src/app/core/services/shared/temp-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public tempId: any;
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required]),
    password: new FormControl('', [
      Validators.required])
  });
  loadingButton: boolean = false;

  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private appContext: AppContextService,
    private authService: AuthService,
    private router: Router,
    private tempTokenService: TempTokenService) {

  }

  ngOnInit() {

  }

  public login(): void {
    if (this.loginForm.valid) {
      this.loadingButton = true;
      this.tempId = this.tempTokenService.token;
      
      console.log(this.tempId);
      this.accountService.getJwtToken(this.email, this.password, this.tempId).subscribe(
        (resultMessage: ResultMessage<string>) => {
          if (resultMessage.IsValid) {
            const token: string = resultMessage.Data;
            this.appContext.setToken(token);

            this.authService.loggedInSubject.next(true);
            // this.authService.authChanged.emit(true);

            // TODO call here GetThisUserAsync()
            this.appContext.setUserEmail(this.email);
            this.tempTokenService.destroyPublicToken();
            this.loadingButton = false;
            this.router.navigate(['/userboard']);
          }
        },
        (httpErrorResponse: HttpErrorResponse) => {
          this.tempTokenService.destroyPublicToken();
          this.loadingButton = false;
          console.log(httpErrorResponse);
          // TODO add errors to array and display
        });
    }
  }

  goToResigter() {
    this.router.navigate(['/register'], { queryParams: { q: this.tempId } });
  }

}
