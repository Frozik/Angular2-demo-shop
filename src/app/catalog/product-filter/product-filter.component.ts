import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { IAppState } from './../../app.store';
import { isDeepEqual } from './../../helpers';
import { SubscriptionComponent, trackSubscription } from './../../helpers/subscription-component.decorator';
import { IRange } from './../../shared/models';
import { NumberPipe } from './../../shared/pipes/number.pipe';
import { CatalogActions } from './../catalog.actions';
import { Gender, ICategory, IProductFilter } from './../models';
import { GenderPipe } from './../pipes/gender.pipe';

@Component({
    selector: 'app-product-filter',
    templateUrl: './product-filter.component.html',
    styleUrls: ['./product-filter.component.scss'],
})
@SubscriptionComponent()
export class ProductFilterComponent implements OnInit {
    @select((state: IAppState) => state.catalog.persistent.categories)
    public categories: Observable<ICategory[]>;
    @select((state: IAppState) => state.catalog.filter.filter)
    public initialFilter: Observable<IProductFilter>;

    public availabilitySubject: Subject<boolean> = new Subject<boolean>();
    public genderSubject: Subject<Gender> = new Subject<Gender>();
    public categoryIdSubject: Subject<number> = new Subject<number>();
    public ratingSubject: Subject<IRange> = new Subject<IRange>();
    public priceSubject: Subject<IRange> = new Subject<IRange>();
    public textSubject: Subject<string> = new Subject<string>();

    public genderItems: Array<{ display: string, value: Gender }>;
    public loading: boolean = true;

    private readonly trackSubscription = trackSubscription.bind(this);

    public constructor(
        private catalogActions: CatalogActions,
        private numberPipe: NumberPipe,
        private genderPipe: GenderPipe,
    ) {
        this.genderItems = [
            { display: this.genderPipe.transform(Gender.Man), value: Gender.Man },
            { display: this.genderPipe.transform(Gender.Woman), value: Gender.Woman },
            { display: this.genderPipe.transform(Gender.Unisex), value: Gender.Unisex },
            { display: this.genderPipe.transform(null), value: null },
        ];
    }

    public ngOnInit() {
        this.catalogActions.fetchCategories();

        this.trackSubscription(
            this.categories.
                map((categories: ICategory[]) => categories === null).
                distinctUntilChanged().
                subscribe((loading) => this.loading = loading),
        );

        this.trackSubscription(
            this.initialFilter.
                first().
                switchMap((filter) => Observable.combineLatest(
                    this.availabilitySubject.startWith(filter.availableOnly),
                    this.genderSubject.startWith(filter.gender),
                    this.categoryIdSubject.startWith(filter.categoryId),
                    this.ratingSubject.startWith(filter.rating),
                    this.priceSubject.startWith(filter.price),
                    this.textSubject.startWith(filter.text),
                    (
                        availableOnly: boolean,
                        gender: Gender,
                        categoryId: number,
                        rating: IRange,
                        price: IRange,
                        text: string,
                    ): IProductFilter => ({
                        availableOnly,
                        gender,
                        categoryId,
                        rating,
                        price,
                        text,
                    }),
                )).
                skip(1).
                debounceTime(1000).
                distinctUntilChanged(isDeepEqual).
                subscribe(this.catalogActions.saveFilter.bind(this.catalogActions)),
        );
    }
}
