import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, pipe, throwError, of, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
// import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChanged: EventEmitter<any> = new EventEmitter();

  private isAuthenticatedTracker;
  private message: string;

  constructor(private router: Router) { }

  /**
   * this is used to clear anything that needs to be removed
   */
  clear(): void {
    localStorage.clear();
  }

  /**
   * check for expiration and if token is still existing or not
   */
  isAuthenticated(): boolean {
    return localStorage.getItem('High-Tech_Token') != null && !this.isTokenExpired();
  }

  isAuthenticatedObservable(): Observable<boolean> {
    return of(localStorage.getItem('High-Tech_Token') != null && !this.isTokenExpired());
  }

  // simulate jwt token is valid
  isTokenExpired(): boolean {
    return false;
  }

  loginAdmin(): void {
    localStorage.setItem('token', `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJyb2xlIjoiQWRtaW4ifQ.rEkg53_IeCLzGHlmaHTEO8KF5BNfl6NEJ8w-VEq2PkE`);

    this.router.navigate(['/dashboard']);
  }

  login(): void {
    localStorage.setItem('token', `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20ifQ.GA0Y9gYIjmx1jLwuRHuBgZ8m6o-NgkD84nO0ym68CWo`);

    this.router.navigate(['/dashboard']);
  }

  /**
   * this is used to clear local storage and also the route to login
   */
  logout(): void {
    this.authChanged.emit(false);
    this.clear();
    this.router.navigate(['/login']);
  }

  decode() {
    let any: any;
    return any;
    // return decode(localStorage.getItem('token'));
  }
}