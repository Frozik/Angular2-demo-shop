import { NgRedux, select } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import { Observable } from 'rxjs/Observable';
import * as URI from 'urijs';

import { environment } from './../../environments/environment';
import { IAppState } from './../app.store';
import { AuthActions } from './auth.actions';
import { IAccount, ICredentials } from './models';

@Injectable()
export class AuthService {
    private returnUrl: string = null;

    @select((state: IAppState) => state.auth.accounts)
    private accounts: Observable<IAccount[]>;

    constructor(
        private router: Router,
        private ngRedux: NgRedux<IAppState>,
        private authActions: AuthActions,
        private http: Http,
    ) {
        const { authServerLocation = '' } = environment;

        const storedAccounts = ngRedux.getState().auth.accounts;

        if (storedAccounts) {
            return;
        }

        const accountsHttp =
            this.http.get(URI(authServerLocation).directory('api/accounts').toString()).
                map((response) => response.json()).
                catch(this.handleError);

        const rolesHttp =
            this.http.get(URI(authServerLocation).directory('api/roles').toString()).
                map((response) => response.json()).
                catch(this.handleError);

        const roleFilter = (account, role) => role.id === account.roleId ||
            role.id === account.roleTypeId;

        Observable.
            combineLatest(
                accountsHttp,
                rolesHttp,
                (accounts, roles): IAccount[] => accounts.map((account) => ({
                    usernameUpperCase: account.username.toUpperCase(),
                    username: account.username,
                    password: account.password,
                    role: (roles.find(roleFilter.bind(this, account)) || { name: '' }).name,
                })),
            ).
            subscribe((accounts) => this.authActions.storeAccounts(accounts));
    }

    public get credentials(): ICredentials {
        return this.ngRedux.getState().auth.credentials;
    }

    public login(username: string, password: string): Observable<boolean> {
        const usernameUpperCase = username.toUpperCase();

        return this.accounts.
            map((accounts) => accounts.find((account) =>
                account.usernameUpperCase === usernameUpperCase &&
                    account.password === password,
            )).
            do((account) => {
                if (account) {
                    this.authActions.authenticate({
                        login: account.username,
                        role: account.role,
                    });
                }
            }).
            map((account) => !!account);
    }

    public logout() {
        this.authActions.logout();
    }

    public navigateFromLogin() {
        // TODO: Main page location should be provided by AppRoutingModule
        const navigationUrl = this.returnUrl || '/';
        this.returnUrl = null;

        this.router.navigate([navigationUrl]);
    }

    public navigateToLogin() {
        // TODO: Login page location should be provided by AppRoutingModule
        this.router.navigate(['/login']);
    }

    public storeNavigationUrl(url: string) {
        this.returnUrl = url;
    }

    private handleError(error: Response | any) {
        let errorMessage: string;

        if (error instanceof Response) {
            const body = error.json() || '';
            const errorText = body.error || JSON.stringify(body);

            errorMessage = `${error.status} - ${error.statusText || ''} ${errorText}`;
        } else {
            errorMessage = error.message ? error.message : error.toString();
        }

        console.error(errorMessage);

        return Observable.throw(errorMessage);
  }
}
