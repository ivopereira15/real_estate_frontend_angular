import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppContextService } from '../app-context.service';
import { Observable } from 'rxjs';
import { ResultMessage } from '../../../shared/models/result-message/result-message';
import { PropertyType } from '../../../shared/models/listing/property-type';
import { OperationType } from '../../../shared/models/listing/operation-type';
import { SellHouse } from '../../../shared/models/listing/sell-house';
import { PropertyBasic } from '../../../shared/models/listing/property-basic';
import { Property } from '../../../shared/models/listing/property';
import { SearchProperty } from '../../../shared/models/search/search-property';
import { SearchPagination } from 'src/app/shared/models/search/search-paginations';
import { SearchPropertyForAdminRequest } from "src/app/shared/models/listing/search-property-admin";
import { PagedProperty } from "src/app/shared/models/listing/paged-property";
import { Guid } from 'guid-typescript';

@Injectable({
    providedIn: 'root'
})
export class ListingService {

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };


    constructor(private http: HttpClient, private appContext: AppContextService) { }

    public getPropertyTypes(): Observable<ResultMessage<PropertyType[]>> {
        return this.http
            .get<ResultMessage<PropertyType[]>>(this.appContext.getAPIUrl() + '/organization/Listing/propertyTypes');
    }

    public getOperationTypes(): Observable<ResultMessage<OperationType[]>> {
        return this.http
            .get<ResultMessage<OperationType[]>>(this.appContext.getAPIUrl() + '/organization/Listing/operationTypes');
    }

    public listSellHouse(listing: SellHouse): Observable<ResultMessage<number>> {
        return this.http
            .post<ResultMessage<number>>(this.appContext.getAPIUrl() + '/organization/Listing/listSellHouse', listing, this.httpOptions);
    }

    public listTempSellHouse(tempId: Guid, listing: SellHouse): Observable<ResultMessage<number>> {
        console.log(tempId);
        return this.http
            .post<ResultMessage<number>>(this.appContext.getAPIUrl() + '/organization/Listing/listSellHouse/temp/' + tempId, listing, this.httpOptions);
    }

    public getUserPropertiesBasic(userId: number): Observable<ResultMessage<PropertyBasic[]>> {
        return this.http
            .get<ResultMessage<PropertyBasic[]>>(this.appContext.getAPIUrl() + '/organization/Listing/getPropertiesByUserBasic/' + userId,
                this.httpOptions);
    }

    public getPropertyByUserId(userId: number, propertyId: number): Observable<ResultMessage<SellHouse>> {
        return this.http
            .get<ResultMessage<SellHouse>>(this.appContext.getAPIUrl() +
                '/organization/Listing/getPropertyByUser/' + userId + '/' + propertyId,
                this.httpOptions);
    }

    public getPropertyByMySqlId(mySqlId: number): Observable<ResultMessage<Property>> {
        return this.http
            .get<ResultMessage<Property>>(this.appContext.getAPIUrl() +
                '/organization/Listing/getProperyByDbId/' + mySqlId,
                this.httpOptions);
    }

    public deletePropertyByUserId(userId: number, propertyId: number): Observable<ResultMessage<any>> {
        return this.http
            .delete<ResultMessage<any>>(this.appContext.getAPIUrl() +
                '/organization/Listing/deletePropertyByUser/' + userId + '/' + propertyId,
                this.httpOptions);
    }

    public searchProperties(searchTerm: SearchProperty): Observable<ResultMessage<PropertyBasic[]>> {
        return this.http.post<ResultMessage<PropertyBasic[]>>(this.appContext.getAPIUrl() + '/organization/Listing/searchProperties', searchTerm, this.httpOptions)
    }

    public searchPropertiesForAdmin(searchTerm: SearchPagination<SearchPropertyForAdminRequest>): Observable<ResultMessage<PagedProperty>> {
        return this.http.post<ResultMessage<PagedProperty>>(this.appContext.getAPIUrl() + '/organization/Listing/admin/search', searchTerm, this.httpOptions)
    }

    public approveProperty(id: number): Observable<ResultMessage<any>> {
        return this.http.post<ResultMessage<any>>(this.appContext.getAPIUrl() + '/organization/Listing/admin/approve/' + id, this.httpOptions)
    }

    public blockProperty(id: number): Observable<ResultMessage<any>> {
        return this.http.post<ResultMessage<any>>(this.appContext.getAPIUrl() + '/organization/Listing/admin/block/'+ id, this.httpOptions)
    }
}
