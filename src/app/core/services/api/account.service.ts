import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultMessage } from 'src/app/shared/models/result-message/result-message';
import { AppContextService } from '../app-context.service';
import { Guid } from 'guid-typescript';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
constructor(private http: HttpClient, private appContext: AppContextService) {}

public getJwtToken(email: string, password: string, tempId: Guid): Observable<ResultMessage<string>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const requestData = { Email: email, Password: password, TempId: tempId.toString() };
    console.log(requestData);
    return this.http.post<ResultMessage<string>>(this.appContext.getAPIUrl() + '/Account/token', requestData, httpOptions);
  }

}
