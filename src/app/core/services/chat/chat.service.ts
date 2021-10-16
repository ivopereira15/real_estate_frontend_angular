import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HttpHeaders } from '@angular/common/http';
import { HubConnection } from '@microsoft/signalr';
import { OnlineUser } from '../../../shared/models/chat/online-user';
import { Store } from '@ngxs/store';
// import * as chatActions from '../../ngxs-state-management/chat.actions';
import { AuthService } from '../../authentication/auth.service';
import { AppContextService } from '../../services/app-context.service';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../../../shared/models/chat/message';

@Injectable({
    providedIn: 'root'
})
export class DirectMessagesService {
    private hubConnection: HubConnection;
    private headers: HttpHeaders;
    isAuthorized = false;

    public onlineUsersSubject: BehaviorSubject<OnlineUser[]> = new BehaviorSubject<OnlineUser[]>([]);
    public onlineUsersObservable = this.onlineUsersSubject.asObservable();;

    public directMessagesSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
    public directMessagesObservable = this.directMessagesSubject.asObservable();;

    public connectedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public connectedObservable = this.connectedSubject.asObservable();

    constructor(private store: Store,
        private authService: AuthService,
        private appContext: AppContextService) {
        this.headers = new HttpHeaders();
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set('Accept', 'application/json');

        this.init();

    }

    sendDirectMessage(message: string, user: OnlineUser): string {
        if (this.hubConnection) {
           //this.hubConnection.invoke('SendDirectMessage', message, user.userName);
            var result = new Message();
            //result.fromOnlineUser = user;
            result.MessageText = message;
            const currentValue = this.directMessagesSubject.value;
            const updatedValue = [...currentValue, result];
            this.directMessagesSubject.next(updatedValue);
        }
        return message;
    }

    // leave(): void {
    //     if (this.hubConnection) {
    //         this.hubConnection.invoke('Leave').then(() => { this.connectedSubject.next(false); });

    //     }
    // }

    // join(): void {
    //     console.log('DMS: send join');
    //     console.log(this.hubConnection);
    //     if (this.hubConnection) {
    //         this.hubConnection.invoke('Join').then(() => {
    //             this.connectedSubject.next(true);
    //         })


    //     }
    // }

    private init(): void {
        if (this.authService.isAuthenticated()) {
            this.isAuthorized = true;
            this.initHub();
        }

        console.log('IsAuthorized:' + this.isAuthorized);
    }

    private initHub(): void {
        console.log('DMS: initHub');
        const token = this.appContext.getToken();
        let tokenValue = '';
        if (token !== undefined) {
            tokenValue = '?token=' + token;
        }
        // const url = 'https://localhost:44390/';

        console.log(tokenValue);
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${this.appContext.getChatUrl()}/chat${tokenValue}`,
                {
                   skipNegotiation: true,
                   transport: signalR.HttpTransportType.WebSockets

                }
            ).withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.hubConnection.start().catch((err) => console.error(err.toString()));

        this.hubConnection.on('getProfileInfo', (onlineUser: OnlineUser) => {
            console.log('DMS: NewOnlineUser received');
            console.log(onlineUser);
            const currentValue = this.onlineUsersSubject.value;
            const updatedValue = [...currentValue, onlineUser];
            this.onlineUsersSubject.next(updatedValue);
            // this.store.dispatch(
            //     new chatActions.ReceivedNewOnlineUserAction(onlineUser)
            // );
        });

        // this.hubConnection.on('NewOnlineUser', (onlineUser: OnlineUser) => {
        //     console.log('DMS: NewOnlineUser received');
        //     console.log(onlineUser);
        //     const currentValue = this.onlineUsersSubject.value;
        //     const updatedValue = [...currentValue, onlineUser];
        //     this.onlineUsersSubject.next(updatedValue);
        //     // this.store.dispatch(
        //     //     new chatActions.ReceivedNewOnlineUserAction(onlineUser)
        //     // );
        // });

        // this.hubConnection.on('OnlineUsers', (onlineUsers: OnlineUser[]) => {
        //     console.log('DMS: OnlineUsers received');
        //     console.log(onlineUsers);
        //     const currentValue = this.onlineUsersSubject.value;
        //     const updatedValue = [...currentValue, onlineUsers];
        //     this.onlineUsersSubject.next(updatedValue as OnlineUser[]);
        //     // this.store.dispatch(
        //     //     new chatActions.ReceivedOnlineUsersAction(onlineUsers)
        //     // );
        // });

        // this.hubConnection.on('Joined', (onlineUser: OnlineUser) => {
        //     console.log('DMS: Joined received');
        //     console.log(onlineUser);
        // });

        // this.hubConnection.on(
        //     'SendDM',
        //     (messagee: string, onlineUserr: OnlineUser) => {
        //         console.log('DMS: SendDM received');
        //         var result = new DirectMessage();
        //         result.fromOnlineUser = onlineUserr;
        //         result.message = messagee;
        //         const currentValue = this.directMessagesSubject.value;
        //         const updatedValue = [...currentValue, result];
        //         this.directMessagesSubject.next(updatedValue);
        //         // this.store.dispatch(
        //         //     new chatActions.ReceivedDirectMessageForUserAction(result)
        //         // );
        //     }
        // );

        // this.hubConnection.on('UserLeft', (name: string) => {
        //     console.log('DMS: UserLeft received');
        //     const currentValue = this.onlineUsersSubject.value;
        //     const updatedValue = currentValue.filter(x => x.userName !== name);
        //     this.onlineUsersSubject.next(updatedValue);
        //     // this.store.dispatch(
        //     //     new chatActions.ReceivedUserLeftAction(name)
        //     // );
        // });
    }
}


