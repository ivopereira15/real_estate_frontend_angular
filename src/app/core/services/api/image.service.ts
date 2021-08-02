import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppContextService } from '../app-context.service';
import { Observable } from 'rxjs';
import { ResultMessage } from '../../../shared/models/result-message/result-message';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    private httpOptions = {
        headers: new HttpHeaders({
            // 'Content-Type': 'application/json' application/x-www-form-urlencoded
            'Content-Type': 'application/octet-stream'
        })
    };

    constructor(private http: HttpClient, private appContext: AppContextService) { }

    public AddPropertyPhoto(photoData: File[], dbId: number): Observable<ResultMessage<string>> {
        const formData: FormData = new FormData();
        for (var i = 0; i < photoData.length; i++) {
            formData.append('files', photoData[i], photoData[i].name);
        }
        formData.append('propertyId', dbId.toString());
        return this.http
            .post<any>(this.appContext.getAPIUrl() + '/Image/addUserPropertyImages', formData);
    }

    public AddPropertyTempPhoto(photoData: File[], dbId: number): Observable<ResultMessage<string>> {
        const formData: FormData = new FormData();
        for (var i = 0; i < photoData.length; i++) {
            formData.append('files', photoData[i], photoData[i].name);
        }
        formData.append('propertyId', dbId.toString());
        return this.http
            .post<any>(this.appContext.getAPIUrl() + '/Image/addUserPropertyTempImages', formData);
    }

}