import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppContextService } from '../app-context.service';
import { Observable } from 'rxjs';
import { ResultMessage } from '../../../shared/models/result-message/result-message';
import { HomePage } from '../../../shared/models/home/home-page';

@Injectable({
    providedIn: 'root'
})
export class HomePageService {

    constructor(private http: HttpClient, private appContext: AppContextService) { }

    public getHomePage(): Observable<ResultMessage<HomePage[]>> {
        return this.http
            .get<ResultMessage<HomePage[]>>(this.appContext.getAPIUrl() + '/organization/Home');
    }0
}
