import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

import { IAppState } from './../app.store';
import { IAccount, ICredentials } from './models';

@Injectable()
export class AuthActions {
    public static StoreCredentials = 'auth-store-credentials';
    public static StoreAccounts = 'auth-store-accounts';

    constructor(private ngRedux: NgRedux<IAppState>) { }

    public logout() {
        this.ngRedux.dispatch({
            type: AuthActions.StoreCredentials,
            payload: null,
        });
    }

    public authenticate(credentials: ICredentials) {
        this.ngRedux.dispatch({
            type: AuthActions.StoreCredentials,
            payload: credentials,
        });
    }

    public storeAccounts(accounts: IAccount[]) {
        this.ngRedux.dispatch({
            type: AuthActions.StoreAccounts,
            payload: accounts,
        });
    }
}
