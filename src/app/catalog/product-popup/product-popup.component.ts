import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { IAppState } from './../../app.store';
import { ISubscriptionTracker } from './../../core/models';
import { SubscriptionTrackerService } from './../../core/subscription-tracker.service';
import { Gender, ICategory, IProduct } from './../models';

@Component({
    selector: 'app-product-popup',
    templateUrl: './product-popup.component.html',
    styleUrls: ['./product-popup.component.scss'],
})
export class ProductPopupComponent implements OnInit {
    @select((state: IAppState) => state.catalog.persistent.categories)
    public categories: Observable<ICategory[]>;

    @Input() public editProduct: IProduct = null;

    @Output() public okPressed = new EventEmitter();
    @Output() public cancelPressed = new EventEmitter();

    public caption: string;
    public genderType: typeof Gender = Gender;
    public form: FormGroup;

    private readonly subscriptionTracker: ISubscriptionTracker;

    constructor(
        private formBuilder: FormBuilder,
        subscriptionTrackerService: SubscriptionTrackerService,
        viewContainerRef: ViewContainerRef,
    ) {
        this.subscriptionTracker = subscriptionTrackerService.buildTracker(viewContainerRef);
    }

    public ngOnInit() {
        this.caption = !this.editProduct
            ? 'Add product'
            : `Edit "${this.editProduct.name}"`;

        const {
            categoryId = null,
            image = '',
            name = '',
            description = '',
            cost = 0,
            rating = 5,
            gender = Gender.Man,
        } = this.editProduct || { };

        this.form = this.formBuilder.group({
            imageUrl: [image.trim()],
            name: [name.trim()],
            category: [''],
            gender: [gender.toString()],
            description: [description.trim()],
            cost: [cost.toString()],
            rating: [rating.toString()],
        });

        this.subscriptionTracker.push(
            this.categories.subscribe((categories) => {
                this.form.controls['category'].setValue(categories && categories.length
                    ? (
                        categories.find((category) => category.id === categoryId) || categories[0]
                    ).id.toString()
                    : '',
                );
            }),
        );
    }

    public buildProductFromFormValues(formValues) {
        const editableFields = {
            categoryId: parseInt(formValues.category, 10),
            image: formValues.imageUrl,
            name: formValues.name,
            description: formValues.description,
            cost: parseFloat(formValues.cost),
            rating: parseInt(formValues.rating, 10),
            gender: parseInt(formValues.gender, 10) as Gender,
        };

        this.okPressed.emit(Object.assign(
            { },
            this.editProduct || { id: null, count: 0, soldCount: 0 },
            editableFields,
        ));
    }
}
