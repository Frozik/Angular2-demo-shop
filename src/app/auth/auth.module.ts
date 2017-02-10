import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthActions } from './auth.actions';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

@NgModule({
    imports: [
        SharedModule,
        AuthRoutingModule,
    ],
    declarations: [
        AuthComponent,
        LoginComponent,
        UserMenuComponent,
    ],
    providers: [AuthActions],
    exports: [UserMenuComponent],
})
export class AuthModule { }
