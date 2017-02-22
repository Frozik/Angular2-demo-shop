import { select } from '@angular-redux/store';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './../../auth/auth.service';
import { Role } from './../../auth/models';
import { SubscriptionComponent, trackSubscription } from './../../helpers/subscription-component.decorator';
import { ProductDetailsParams } from './../catalog-routing.module';
import { CatalogActions } from './../catalog.actions';
import { Gender, ICategory, IProduct } from './../models';
import { selectCategories, selectFilterProduct } from './../state-selectors';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
})
@SubscriptionComponent()
export class ProductDetailsComponent implements OnInit, OnDestroy {
    @select(selectCategories) public categories: Observable<ICategory[]>;
    @select(selectFilterProduct) public product: Observable<IProduct>;

    public category: ICategory = null;
    public loading: boolean = true;
    public genderType: typeof Gender = Gender;
    public roles: typeof Role = Role;

    private readonly trackSubscription = trackSubscription.bind(this);

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private catalogActions: CatalogActions,
        public authService: AuthService,
        public location: Location,
    ) { }

    ngOnInit() {
        this.catalogActions.fetchCategories();

        this.trackSubscription(
            this.activatedRoute.params.
                subscribe((params: ProductDetailsParams) =>
                    this.catalogActions.fetchProduct(parseInt(params.id , 10))),
        );

        this.trackSubscription(
            Observable.
                combineLatest(
                    this.categories,
                    this.product,
                    (categories: ICategory[], product: IProduct) =>
                        categories === null || product === undefined,
                ).
                distinctUntilChanged().
                subscribe((loading) => this.loading = loading),
        );

        this.trackSubscription(
            Observable.
                combineLatest(
                    this.categories.filter((categories) => categories !== null),
                    this.product.filter((product) => !!product),
                    (categories: ICategory[], product: IProduct) =>
                        categories.find((category: ICategory) => category.id === product.categoryId),
                ).
                filter((category: ICategory) => !!category).
                subscribe((category: ICategory) => this.category = category),
        );
    }

    ngOnDestroy() {
        this.catalogActions.clearSellState();
    }
}
