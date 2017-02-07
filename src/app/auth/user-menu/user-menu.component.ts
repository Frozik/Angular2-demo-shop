import { Component } from '@angular/core';

import { AppActions } from './../../app.actions';
import { AuthService } from './../auth.service';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
    constructor(
        public authService: AuthService,
        private appActions: AppActions,
    ) { }

    logout() {
        this.authService.logout();

        this.appActions.resetCache();

        this.authService.navigateToLogin();
    }
}
