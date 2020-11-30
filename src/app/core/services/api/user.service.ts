import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppContextService } from '../app-context.service';
import { User } from 'src/app/shared/models/user/user';
import { ResultMessage } from 'src/app/shared/models/result-message/result-message';
import { Observable } from 'rxjs';
import { SearchPagination } from 'src/app/shared/models/search/search-paginations';
import { SearchUser } from 'src/app/shared/models/search/search-user';
import { shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient, private appContext: AppContextService) { }

    public createNewUser(newuser: User): Observable<ResultMessage<string>> {
        return this.http
        .post<ResultMessage<string>>(this.appContext.getAPIUrl() + '/organization/User/createNewUser', newuser, this.httpOptions);
    }

    public getUserByEmail(email: string): Observable<ResultMessage<User>> {
        return this.http
        .get<ResultMessage<User>>(this.appContext.getAPIUrl() + '/organization/User/' + email, this.httpOptions);
    }

    public getUserById(userId: number): Observable<ResultMessage<User>> {
        return this.http
        .get<ResultMessage<User>>(this.appContext.getAPIUrl() + '/organization/User/' + userId, this.httpOptions);
    }

    public updateUser(user: User): Observable<any> {
        return this.http
        .post<any>(this.appContext.getAPIUrl() + '/organization/User/updateUser', user, this.httpOptions);
    }

    public searchUsers(term: SearchPagination<SearchUser>): Observable<ResultMessage<User[]>> {
        return this.http
        .post<any>(this.appContext.getAPIUrl() + '/organization/User/search', term, this.httpOptions);
    }
}
