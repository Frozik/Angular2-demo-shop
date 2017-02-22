import { select } from '@angular-redux/store';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CatalogActions } from './../catalog.actions';
import { IProduct, SellState } from './../models';
import { selectSellState } from './../state-selectors';

@Component({
    selector: 'app-customer-controls',
    templateUrl: './customer-controls.component.html',
    styleUrls: ['./customer-controls.component.scss'],
})
export class CustomerControlsComponent {
    @select(selectSellState) public sellState: Observable<SellState>;

    @Input() public product: IProduct;

    public sellStateType: typeof SellState = SellState;

    public constructor(private catalogActions: CatalogActions) { }

    public buy() {
        this.catalogActions.sellProduct(this.product.id);
    }
}
