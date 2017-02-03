import { IPayloadAction } from './../redux-action.type';
import { AuthActions } from './auth.actions';
import { IAccount, ICredentials } from './models';

export interface IAuthStore {
    credentials: ICredentials;
    accounts: IAccount[];
}

const initialState: IAuthStore = {
    credentials: null,
    accounts: null,
};

export function authReducer(
    state: IAuthStore = initialState,
    action: IPayloadAction,
): IAuthStore {
    const { type, payload } = action;

    switch (type) {
        case AuthActions.StoreCredentials:
            return {
                credentials: payload as ICredentials,
                accounts: state.accounts,
            };

        case AuthActions.StoreAccounts:
            return {
                credentials: state.credentials,
                accounts: payload as IAccount[],
            };

        default:
            return state;
    }
}
