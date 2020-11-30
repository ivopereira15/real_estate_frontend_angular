import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppContextService {

    constructor() { }

    public getAPIUrl(): string {
        const env = this.getEnvironment();
        return env.ApiUrl;
    }

    public getEnvironment() {
            return environment.startupApiEnvironment;
    }

    public setToken(token: string): void {
        localStorage.setItem('High-Tech_Token', token);
    }

    public getToken(): string {
        const token = localStorage.getItem('High-Tech_Token');
        return token;
    }

    // TODO check where to store user info? Cookies????
    public setUserEmail(email: string) {
        localStorage.setItem('User-email', email);
    }

    public getUserEmail() {
        const userEmail = localStorage.getItem('User-email');
        return userEmail;
    }

    public setUserId(id: number) {
        localStorage.setItem('User-id', id.toString());
    }

    public getUserId(): number {
        const userId = localStorage.getItem('User-id');
        return +userId;
    }

}
