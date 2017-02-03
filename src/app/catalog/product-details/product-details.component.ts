import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select } from 'ng2-redux';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from './../../app.store';
import { AuthService } from './../../auth/auth.service';
import { Role } from './../../auth/models';
import { CatalogActions } from './../catalog.actions';
import { Gender, ICategory, IProduct } from './../models';

import { ProductDetailsParams } from './../catalog-routing.module';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
    @select((state: IAppState) => state.catalog.persistent.categories)
    public categories: Observable<ICategory[]>;
    @select((state: IAppState) => state.catalog.filter.product)
    public product: Observable<IProduct>;

    public category: ICategory = null;
    public loading: boolean = true;
    public genderType: typeof Gender = Gender;
    public roles: typeof Role = Role;

    private readonly subscriptions: Subscription[] = [];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private catalogActions: CatalogActions,
        public authService: AuthService,
        public location: Location,
    ) { }

    ngOnInit() {
        this.catalogActions.fetchCategories();

        this.subscriptions.push(
            this.activatedRoute.params.
                subscribe((params: ProductDetailsParams) =>
                    this.catalogActions.fetchProduct(parseInt(params.id , 10))),
        );

        this.subscriptions.push(
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

        this.subscriptions.push(
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

        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }
}
