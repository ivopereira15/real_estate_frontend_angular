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

  public loggedInSubject: BehaviorSubject<boolean>;
  public loggedInObservable: Observable<boolean>;

  constructor(private router: Router) {
    this.loggedInSubject = new BehaviorSubject(localStorage.getItem('High-Tech_Token') != null);
    this.loggedInObservable = this.loggedInSubject.asObservable();
   }

   // Basically this was done not to have an subscription in the jwt interceptor
   // I think it would affect the performance...
  public get loggedInValue(): boolean {
    return this.loggedInSubject.value;
  }

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

  /**
   * this is used to clear local storage and also the route to login
   */
  logout(): void {
    this.loggedInSubject.next(false);
    // this.authChanged.emit(false);
    this.clear();
    this.router.navigate(['/login']);
  }

  decode() {
    let any: any;
    return any;
    // return decode(localStorage.getItem('token'));
  }
}