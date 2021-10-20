import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChatService } from '../../../../core/services/api/chat.service';
import { DirectMessagesService } from '../../../../core/services/chat/chat.service';
import { AppContextService } from '../../../../core/services/app-context.service';
import { ChatRoom } from '../../../../shared/models/chat/chat-room';
import { Message } from '../../../../shared/models/chat/message';
import { OnlineUser } from '../../../../shared/models/chat/online-user';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public text: string;
  public name: string;
  public newRoom: string;
  public messages: Message[] = [];
  //public rooms: ChatRoom[] = [];
  public currentRoomId: string;
  public users: OnlineUser[] = [];

  selectedRoom: ChatRoom;

  private unsubscribeOnDestroy = new Subject<void>();
  directMessages$: Observable<Message[]>;
  chatRooms: ChatRoom[];

  public constructor(
    //  private chatService: ChatService,
    //  private userService: UsersService,
    //  private roomService: RoomService,
    private chatService: ChatService, private appContext: AppContextService,
    private chatHubService: DirectMessagesService,
    private store: Store
  ) {
  }

  public ngOnInit() {
    let userId = this.appContext.getUserId();
    console.log(userId);
    this.chatService.getChatRoomsForUser(userId).subscribe(
      (res: any) => {
        console.log(res);
        if (res !== []) {
          this.chatRooms = res;
          console.log(res);
          this.selectRoom(this.chatRooms[0].id);
        }
      }
    );
    //--------------------------------------------
    this.getProfile();
    // this.chatService
    //   .getMessage()
    //   .pipe(takeUntil(this.unsubscribeOnDestroy))
    //   .subscribe((data: Message) => {
    //     this.messages.push(data);
    //   });
    this.getUsersList();
  }

  public ngOnDestroy() {
    this.unsubscribeOnDestroy.next();
    this.unsubscribeOnDestroy.complete();
  }

  public selectRoom(roomId: string) {
    this.selectedRoom = this.chatRooms.find(x => x.id == roomId);
    this.messages = this.selectedRoom.messages;
  }

  public send(): void {
    if (this.text && this.text.trim() !== '') {
      console.log(this.text);
      this.chatHubService.sendPrivateMessage("1", this.text, this.selectedRoom.id);
      // this.store.dispatch(directMessagesAction.sendDirectMessageAction(this.text));
      this.text = '';
    }
  }

  public getProfile(): void {
    // this.userService.getProfile()
    //   .pipe(takeUntil(this.unsubscribeOnDestroy))
    //   .subscribe((res: OnlineUser) => {
    //     this.name = res.username;
    //   });
  }

  public getUsersList(): void {
    // this.chatService.getUsers()
    //   .pipe(takeUntil(this.unsubscribeOnDestroy))
    //   .subscribe((users: OnlineUser[]) => {
    //     this.users = users;
    //   });
  }

}
