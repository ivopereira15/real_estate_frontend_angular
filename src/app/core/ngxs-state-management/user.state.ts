import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddUserType } from './user.actions';
import { IUser } from '../../shared/models/state-management/user';

@State<IUser>({
    name: 'user',
    defaults: {
        userType: null
    }
})
export class UserState {


    @Selector() static getUserType(state: IUser): number {
        return state.userType;
    }

    @Action(AddUserType)
    public addUserType(ctx: StateContext<IUser>, payload: AddUserType) {
        const state: IUser = ctx.getState();

        return ctx.setState({
            ...state,
            userType: payload.userType
        });
    }

}
