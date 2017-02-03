import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth-guard.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UnauthGuard } from './auth/unauth-guard.service';
import { CatalogModule } from './catalog/catalog.module';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/catalog', pathMatch: 'full' },
    { path: 'login', loadChildren() { return AuthModule; }, canActivate: [UnauthGuard] },
    { path: 'catalog', loadChildren() { return CatalogModule; } },
    { path: '**', redirectTo: '/catalog' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
    ],
    exports: [
        RouterModule,
        CatalogModule,
    ],
    providers: [
        AuthGuard,
        CatalogModule,
        AuthService,
        UnauthGuard,
    ],
})
export class AppRoutingModule { }
