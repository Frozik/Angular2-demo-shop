import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: '', component: LoginComponent, pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes),
    ],
    exports: [RouterModule],
})
export class AuthRoutingModule { }
