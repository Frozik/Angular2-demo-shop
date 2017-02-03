import { Component, Input } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { IAppState } from './../../app.store';
import { CatalogActions } from './../catalog.actions';
import { IProduct, SellState } from './../models';

@Component({
    selector: 'app-customer-controls',
    templateUrl: './customer-controls.component.html',
    styleUrls: ['./customer-controls.component.scss'],
})
export class CustomerControlsComponent {
    @Input() public product: IProduct;
    @select((state: IAppState) => state.catalog.sell.sellState) public sellState: Observable<SellState>;

    public sellStateType: typeof SellState = SellState;

    public constructor(
        private ngRedux: NgRedux<IAppState>,
        private catalogActions: CatalogActions,
    ) { }

    public buy() {
        this.catalogActions.sellProduct(this.product.id);
    }
}
