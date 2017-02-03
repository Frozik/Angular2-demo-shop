import { NgModule } from '@angular/core';
import { Params, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../auth/auth-guard.service';
import { AuthGuardAction, Role } from './../auth/models';
import { CatalogComponent } from './catalog/catalog.component';
import { ChartsComponent } from './charts/charts.component';
import { LandingComponent } from './landing/landing.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';

const appRoutes: Routes = [
    {
        path: '',
        component: CatalogComponent,
        canActivate: [AuthGuard],
        data: { guardAction: AuthGuardAction.NavigateToLogin },
        children: [
            { path: '', component: LandingComponent, pathMatch: 'full' },
            {
                path: 'filter',
                component: ProductsComponent,
                canActivate: [AuthGuard],
                data: { guardRoles: {
                    roles: [Role.customer, Role.administrator],
                    guardAction: AuthGuardAction.Authorize,
                } },
                pathMatch: 'full',
            },
            {
                path: 'product/:id',
                component: ProductDetailsComponent,
                canActivate: [AuthGuard],
                data: { guardRoles: {
                    roles: [Role.customer, Role.administrator],
                    guardAction: AuthGuardAction.Authorize,
                } },
                pathMatch: 'full',
            },
            {
                path: 'charts',
                component: ChartsComponent,
                canActivate: [AuthGuard],
                data: { guardRoles: {
                    roles: [Role.manager],
                    guardAction: AuthGuardAction.Authorize,
                } },
                pathMatch: 'full',
            },
        ],
    },
];

export type ProductDetailsParams = Params & {
    id: string;
};

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes),
    ],
    exports: [RouterModule],
})
export class CatalogRoutingModule { }
