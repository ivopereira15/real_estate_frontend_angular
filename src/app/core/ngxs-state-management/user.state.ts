import { State, Action, StateContext, Selector } from "@ngxs/store";
import { AddUserType } from './user.actions';
import { Observable } from 'rxjs';
import { IUser } from "../../shared/models/state-management/user";

@State<IUser>({
    name: 'user',
    defaults: {
        userType: null
    }
})
export class UserState {
    @Action(AddUserType)
    public addUserType(ctx: StateContext<IUser>, payload: AddUserType) {
        const state: IUser = ctx.getState();

        // state.accountId = payload.accountId;
        // ctx.patchState(state);

        return ctx.setState({
            ...state,
            userType: payload.userType
        });
    }


    @Selector() static getUserType(state: IUser): number {
        return state.userType;
    }
}