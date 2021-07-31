import { Injectable, Inject, OnDestroy, OnInit } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TempTokenService {

    public token: any;

    setPublicToken(token: any) {
        this.token = token;
    }

    destroyPublicToken() {
        this.token = null;
    }

}