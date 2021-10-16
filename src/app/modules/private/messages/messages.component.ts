import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OnlineUser } from 'src/app/shared/models/chat/online-user';
import { Store } from '@ngxs/store';
import { DirectMessagesService } from 'src/app/core/services/chat/chat.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { Message } from '../../../shared/models/chat/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  public async: any;
  //onlineUser: OnlineUser = { connectionId: '', userName: '' };
  selectedOnlineUserName = '';
  isAuthorized = false;
  message = '';
  onlineUsers: OnlineUser[] = [];
  directMessages$: Observable<Message[]>;
  // connected$: Observable<boolean>;
  connected = false;
  constructor(
    private authService: AuthService,
    private store: Store,
    private chatService: DirectMessagesService
  ) {
    this.chatService.onlineUsersObservable.subscribe((res) => {
      console.log(res);
      this.onlineUsers = res;
    });
    this.directMessages$ = this.chatService.directMessagesObservable;

    this.chatService.connectedObservable.subscribe((result) => {
      console.log(result);
      this.connected = result;
    })
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.isAuthorized = true;
    }

    console.log('IsAuthorized:' + this.isAuthorized);
  }

  selectChat(onlineuserUserName: string): void {
    console.log('DMC: selectedOnlineUserName' + onlineuserUserName);
    this.selectedOnlineUserName = onlineuserUserName;
  }

  // sendMessage(): void {
  //   console.log(
  //     'DMC: send message to:' + this.selectedOnlineUserName + ':' + this.message
  //   );

  //   const message = {
  //     payload: {
  //       message: this.message,
  //       userNameTarget: this.selectedOnlineUserName,
  //     },
  //   };
 
  //   this.chatService.sendDirectMessage(this.message, this.onlineUser);
  //   //  this.store.dispatch(directMessagesAction.sendDirectMessageAction(message));
  // }

  // getUserInfoName(directMessage: DirectMessage): string {
  //   if (directMessage.fromOnlineUser) {
  //     return directMessage.fromOnlineUser.userName;
  //   }

  //   return '';
  // }

  disconnect(): void {
    //this.chatService.leave();
    // this.store.dispatch(directMessagesAction.leaveAction());
  }

  connect(): void {
    //this.chatService.join();
    //  this.store.dispatch(directMessagesAction.joinAction());
  }

}
