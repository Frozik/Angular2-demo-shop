import { select } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { IAppState } from './../../app.store';
import { SubscriptionComponent, trackSubscription } from './../../helpers/subscription-component.decorator';
import { Gender, ICategory, IProduct } from './../models';

@Component({
    selector: 'app-product-popup',
    templateUrl: './product-popup.component.html',
    styleUrls: ['./product-popup.component.scss'],
})
@SubscriptionComponent()
export class ProductPopupComponent implements OnInit {
    @select((state: IAppState) => state.catalog.persistent.categories)
    public categories: Observable<ICategory[]>;

    @Input() public editProduct: IProduct = null;

    @Output() public okPressed = new EventEmitter();
    @Output() public cancelPressed = new EventEmitter();

    public caption: string;
    public genderType: typeof Gender = Gender;
    public form: FormGroup;
    public isFormValid = false;

    private readonly trackSubscription = trackSubscription.bind(this);

    constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            imageUrl: [''],
            name: [''],
            category: [''],
            gender: [''],
            description: [''],
            cost: [''],
            rating: [''],
        });
    }

    public ngOnInit() {
        const {
            imageUrl: imageUrlControl,
            name: nameControl,
            gender: genderControl,
            description: descriptionControl,
            cost: costControl,
            rating: ratingControl,
            category: categoryControl,
        } = this.form.controls;

        if (this.editProduct) {
            const {
                image,
                name,
                description,
                cost,
                rating,
                gender,
            } = this.editProduct;

            this.caption = `Edit "${name}"`;

            imageUrlControl.setValue(image);
            nameControl.setValue(name);
            genderControl.setValue(gender.toString());
            descriptionControl.setValue(description);
            costControl.setValue(cost.toString());
            ratingControl.setValue(rating.toString());

            this.isFormValid = true;
        } else {
            this.caption = 'Add product';

            genderControl.setValue(Gender.Man.toString());
            costControl.setValue('0');
            ratingControl.setValue('5');

            this.isFormValid = false;
        }

        // Workaround for https://github.com/angular/angular/issues/5950#issuecomment-206925375
        this.trackSubscription(
            this.form.statusChanges.subscribe(() => this.isFormValid = this.form.valid),
        );

        this.trackSubscription(
            this.categories.
                subscribe((categories) => {
                    const controlCategoryId = parseInt(this.form.controls['category'].value, 10) || 
                        (this.editProduct ? this.editProduct.categoryId : null);

                    categoryControl.setValue(categories && categories.length
                        ? (
                            categories.find((category) => category.id === controlCategoryId) || categories[0]
                        ).id.toString()
                        : '',
                    );
                }),
        );

        // Fix unknown bug when statusChanges is triggered only with PENDING status right after initialization
        setTimeout(() => this.form.updateValueAndValidity(), 0);
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
