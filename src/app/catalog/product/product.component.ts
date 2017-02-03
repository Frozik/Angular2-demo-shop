import { Component, Input } from '@angular/core';

import { Gender, IProduct } from './../models';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
    public genderType: typeof Gender = Gender;

    @Input() public product: IProduct;
}
