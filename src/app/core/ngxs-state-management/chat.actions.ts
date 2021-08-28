// import { OnlineUser } from "../../shared/models/chat/online-user";
// import { SendDirectMessageDto } from "../../shared/models/chat/send-direct-message";
// import { ReceivedDirectMessageForUserDto } from "../../shared/models/chat/received-user-message";

// export class ReceivedNewOnlineUserAction {
//     public static readonly type: string = '[DM] RECEIVED_NEW_ONLINE_USER';
//     constructor(public payload: OnlineUser) {}
// }

// export class ReceivedOnlineUsersAction {
//     public static readonly type: string = '[DM] RECEIVED_ONLINE_USERS';
//     constructor(public payload: OnlineUser[]) {}
// }

// export class ReceivedUserLeftAction {
//     public static readonly type: string = '[DM] RECEIVED_USER_LEFT';
//     constructor(public payload: string) {}
// }

// export class JoinAction {
//     public static readonly type: string = '[DM] JOIN';
// }

// export class JoinActionFinished {
//     public static readonly type: string = '[DM] JOIN FINISHED';
// }

// export class LeaveAction {
//     public static readonly type: string = '[DM] LEAVE';
// }

// export class LeaveActionFinished {
//     public static readonly type: string = '[DM] LEAVE FINISHED';
// }

// export class SendDirectMessageActionFinished {
//     public static readonly type: string = '[DM] SEND_DIRECT_MESSAGE_FINISHED';
//     constructor(public payload: string) {}
// }

// export class SendDirectMessageAction {
//     public static readonly type: string = '[DM] SEND_DIRECT_MESSAGE';
//     constructor(public payload: SendDirectMessageDto) {}
// }

// export class ReceivedDirectMessageForUserAction {
//     public static readonly type: string = '[DM] RECEIVED_DIRECT_MESSAGE';
//     constructor(public payload: ReceivedDirectMessageForUserDto) {}
// }