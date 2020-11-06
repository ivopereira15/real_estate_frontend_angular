import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../authentication/auth.service';
import { AppContextService } from '../services/app-context.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthService,
        private appContext: AppContextService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        // const user = this.authenticationService.isAuthenticated;
        const isLoggedIn = this.authenticationService.loggedInValue;
        console.log(isLoggedIn);
        const isApiUrl = request.url.startsWith(environment.startupApiEnvironment.ApiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.appContext.getToken()}`
                }
            });
        }

        return next.handle(request);
    }
}