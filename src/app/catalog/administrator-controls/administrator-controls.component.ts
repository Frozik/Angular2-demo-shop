import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgRedux } from 'ng2-redux';

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

    public editing: boolean = false;
    public deleting: boolean = false;
    public editingProduct: {
        image: string,
        name: string,
        description: string,
        cost: number,
        rating: string,
    } = null;

    public constructor(
        private ngRedux: NgRedux<IAppState>,
        private catalogActions: CatalogActions,
        private location: Location,
    ) { }

    public addProducts() {
        this.catalogActions.addProductCount(this.product.id, 5);
    }

    public editProduct() {
        this.editing = true;

        const { image, name, description, cost, rating } = this.product;

        this.editingProduct = { image, name, description, cost, rating: rating.toString() };
    }

    public updateProductDetails() {
        const { image, name, description, cost, rating } = this.editingProduct;

        this.catalogActions.updateProductDetails(
            this.product.id,
            {
                image,
                name,
                description,
                cost: cost || 0,
                rating: parseInt(rating, 10),
            },
        );
    }

    public deleteProduct() {
        this.location.back();

        this.catalogActions.deleteProduct(this.product.id);
    }
}
