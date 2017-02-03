import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../auth/auth.service';
import { Role } from './../../auth/models';

@Component({ template: '' })
export class LandingComponent {
    constructor(
        public authService: AuthService,
        private router: Router,
    ) {
        const { credentials } = this.authService;

        if (credentials.role !== Role.manager) {
            this.router.navigate([ 'catalog', 'filter']);
        } else {
            this.router.navigate([ 'catalog', 'charts']);
        }
    }
}
