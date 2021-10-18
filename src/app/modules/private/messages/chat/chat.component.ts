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
    let dfdf = new Message();
    dfdf.MessageText = "dfdf"
    this.messages.push(dfdf);
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
    this.getRooms();
    this.getRoomsFromSocket();
    this.getUsersList();
  }

  public ngOnDestroy() {
    this.unsubscribeOnDestroy.next();
    this.unsubscribeOnDestroy.complete();
  }

  public send(): void {
    if (this.text && this.text.trim() !== '') {

      this.chatHubService.sendPrivateMessage("someid", this.text, "df");
     // this.store.dispatch(directMessagesAction.sendDirectMessageAction(this.text));
      this.text = '';
    }
  }

  public getRoomsFromSocket(): void {
    // this.chatService.getRooms()
    //   .pipe(takeUntil(this.unsubscribeOnDestroy))
    //   .subscribe((res: ChatRoom) => {
    //     const updatedRooms = [res, ...this.rooms];
    //     this.rooms = updatedRooms;
    //   });
  }


  public getRooms(): void {
    // this.roomService.getRooms()
    //   .pipe(takeUntil(this.unsubscribeOnDestroy))
    //   .subscribe((res: ChatRoom[]) => {
    //     this.rooms = res;
    //   });
  }

  public joinRoom(room): void {
    // this.chatService.joinRoom(room);
    // this.currentRoomId = room;
  }

  public getRoom(id): void {
    // this.roomService.getRoom(id)
    //   .pipe(takeUntil(this.unsubscribeOnDestroy))
    //   .subscribe((res: ChatRoom) => {
    //     this.messages = res.messages;
    //     this.title = res.title;
    //   });
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
