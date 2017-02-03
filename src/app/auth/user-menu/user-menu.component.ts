import { Component } from '@angular/core';

import { AuthService } from './../auth.service';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
    constructor(public authService: AuthService) { }

    logout() {
        this.authService.logout();

        this.authService.navigateToLogin();
    }
}
