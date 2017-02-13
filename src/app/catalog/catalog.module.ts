import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { SharedModule } from './../shared/shared.module';
import { AdministratorControlsComponent } from './administrator-controls/administrator-controls.component';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogActions } from './catalog.actions';
import { CatalogComponent } from './catalog/catalog.component';
import { ChartsComponent } from './charts/charts.component';
import { CustomerControlsComponent } from './customer-controls/customer-controls.component';
import { LandingComponent } from './landing/landing.component';
import { GenderPipe } from './pipes/gender.pipe';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductPopupComponent } from './product-popup/product-popup.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CatalogRoutingModule,
        ChartsModule,
    ],
    declarations: [
        ProductComponent,
        ProductFilterComponent,
        ProductListComponent,
        CatalogComponent,
        ProductDetailsComponent,
        ProductsComponent,
        CustomerControlsComponent,
        AdministratorControlsComponent,
        GenderPipe,
        LandingComponent,
        ChartsComponent,
        ProductPopupComponent,
    ],
    providers: [
        CatalogActions,
        GenderPipe,
    ],
})
export class CatalogModule { }
