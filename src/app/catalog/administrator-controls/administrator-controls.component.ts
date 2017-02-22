import { NgRedux } from '@angular-redux/store';
import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

import { IAppState } from './../../app.store';
import { CatalogActions } from './../catalog.actions';
import { IProduct } from './../models';

@Component({
    selector: 'app-administrator-controls',
    templateUrl: './administrator-controls.component.html',
    styleUrls: ['./administrator-controls.component.scss'],
})
export class AdministratorControlsComponent {
    @Input() public product: IProduct;

    public editing = false;
    public deleting = false;

    public constructor(
        private ngRedux: NgRedux<IAppState>,
        private catalogActions: CatalogActions,
        private location: Location,
    ) { }

    public addProductsToWarehouse() {
        this.catalogActions.addProductsToWarehouse(this.product.id, 5);
    }

    public updateProductDetails(product: IProduct) {
        this.catalogActions.updateProductDetails(product);
    }

    public deleteProduct() {
        this.location.back();

        this.catalogActions.deleteProduct(this.product.id);
    }
}
