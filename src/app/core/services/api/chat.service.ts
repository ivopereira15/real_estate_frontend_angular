import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppContextService } from '../app-context.service';
import { Observable } from 'rxjs';
import { ResultMessage } from '../../../shared/models/result-message/result-message';
import { HomePage } from '../../../shared/models/home/home-page';
import { ChatRoom } from '../../../shared/models/chat/chat-room';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(private http: HttpClient, private appContext: AppContextService) { }

    public getChatRoomsForUser(userId: number): Observable<ResultMessage<ChatRoom[]>> {
        return this.http
            .get<ResultMessage<ChatRoom[]>>(this.appContext.getChatUrl() + '/Chat/' + userId);
    }
}
