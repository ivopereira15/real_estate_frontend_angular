import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppContextService } from '../app-context.service';
import { Observable } from 'rxjs';
import { ResultMessage } from '../../../shared/models/result-message/result-message';
import { EmailInput } from '../../../shared/models/email/email-input';

@Injectable({
    providedIn: 'root'
})
export class EmailService {

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient, private appContext: AppContextService) { }

    public sendEmail(email: EmailInput): Observable<ResultMessage<any>> {
        return this.http
            .post<ResultMessage<any>>(this.appContext.getAPIUrl() + '/organization/Email', email, this.httpOptions);
    }
}
