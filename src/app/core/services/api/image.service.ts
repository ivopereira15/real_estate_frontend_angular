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
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient, private appContext: AppContextService) { }

    public AddPropertyPhoto(photoData: File[], dbId: number, elasticId?: number): Observable<ResultMessage<string>> {
        const formData: FormData = new FormData();
        let array = [];
        // for (var i = 0; i < photoData.length; i++) {
        //     formData.append("photos", photoData[i]);
        //     //  array.push(photoData[i]);
        // }
        for (const file of photoData) {
            formData.append('photos', file);
        }
        // formData.append("photos", JSON.stringify(array));
        // formData.append('propertyElasticId', elasticId.toString());
        formData.append('propertyId', dbId.toString());
        console.log(formData);
        return this.http
            .post<any>(this.appContext.getAPIUrl() + '/Image/addUserPropertyImages', formData);
    }

    // public downloadPhotoFromAzure(url: string): Observable<any> {
    //     return this.http.get(url, { responseType: 'blob' });
    // }
}