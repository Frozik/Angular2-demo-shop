import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from './auth.service';
import { AuthGuardAction, AuthRoutingData } from './models';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        const { guardAction, guardRoles } = route.data as AuthRoutingData;

        return this.hasPermissionsToActivate(url, guardAction, guardRoles);
    }

    public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    private hasPermissionsToActivate(
        url: string,
        guardAction?: AuthGuardAction,
        guardRoles?: {
             roles: string[];
             guardAction?: AuthGuardAction;
         },
    ): boolean {
        const credentials = this.authService.credentials;

        if (!credentials) {
            this.performAuthGuardAction(guardAction, url);
        }

        if (!guardRoles ||
            !guardRoles.roles ||
            guardRoles.roles.some((role) => role === credentials.role)) {
            return true;
        }

        this.performAuthGuardAction(guardRoles.guardAction || guardAction, url);
    }

    private performAuthGuardAction(action: AuthGuardAction, url: string) {
        switch (action || AuthGuardAction.Authorize) {
            case AuthGuardAction.NavigateToLogin:
                this.authService.storeNavigationUrl(url);
                this.authService.navigateToLogin();
                return false;

            default:
                return false;
        }
    }
}
