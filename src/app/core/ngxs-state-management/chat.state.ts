// import { State, Action, StateContext, Selector } from "@ngxs/store";
// import { AddUserType } from './user.actions';
// import { IUser } from "../../shared/models/state-management/user";
// import { OnlineUser } from "../../shared/models/chat/online-user";
// import { DirectMessage } from "../../shared/models/chat/direct-message";
// import { Injectable } from "@angular/core";
// import { ReceivedNewOnlineUserAction, ReceivedOnlineUsersAction, ReceivedUserLeftAction } from "./chat.actions";
// import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';

// export interface DirectMessagesState {
//     onlineUsers: OnlineUser[];
//     directMessages: DirectMessage[];
//     connected: boolean;
//   }

// @State<OnlineUser>({
//     name: 'onlineUser',
//     defaults: { connectionId: null, userName: null }
// })
// @Injectable()
// export class ReceivedNewOnlineUserActionState {
//     @Action(ReceivedNewOnlineUserAction)
//     public receivedNewOnlineUser(ctx: StateContext<OnlineUser>, payload: ReceivedNewOnlineUserAction) {
//         const state: OnlineUser = ctx.getState();

//         return ctx.setState({
//             ...state,
//             connectionId: payload.payload.connectionId,
//             userName: payload.payload.userName
//         });
//     }
// }

// @State<OnlineUser[]>({
//     name: 'onlineUsers',
//     defaults: [{ connectionId: null, userName: null }]
// })
// @Injectable()
// export class ReceivedOnlineUsersActionState {
//     @Action(ReceivedOnlineUsersAction)
//     public receivedOnlineUsersAction(ctx: StateContext<OnlineUser>, { payload }: ReceivedOnlineUsersAction) {
//         return ctx.setState(patch(append(payload)));
//     }
// }

// export interface IReceivedUserLeftActionState {
//     payload: string;
// }

// @State<IReceivedUserLeftActionState>({
//     name: 'onlineUserLeft',
//     defaults: {
//         payload: null
//     }
// })
// @Injectable()
// export class ReceivedUserLeftActionState {
//     @Action(ReceivedNewOnlineUserAction)
//     public receivedNewOnlineUser(ctx: StateContext<IReceivedUserLeftActionState>, payload: ReceivedUserLeftAction) {
//         const state = ctx.getState();
//         ctx.setState({
//             ...state,
//             payload: payload.payload
//         });
//     }
// }