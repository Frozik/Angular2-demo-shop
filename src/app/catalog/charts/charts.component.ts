import { select } from '@angular-redux/store';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';

import { SubscriptionComponent, trackSubscription } from './../../helpers/subscription-component.decorator';
import { CatalogActions } from './../catalog.actions';
import { ICategory, IRevenueByCategory, ISoldItemsByCategory } from './../models';
import {
    selectCategories,
    selectChartSoldByCategory,
    selectChartSoldPriceByCategory,
} from './../state-selectors';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
})
@SubscriptionComponent()
export class ChartsComponent implements OnInit, OnDestroy {
    @select(selectCategories) public categories: Observable<ICategory[]>;
    @select(selectChartSoldByCategory) public soldItemsByCategory: Observable<ISoldItemsByCategory[]>;
    @select(selectChartSoldPriceByCategory) public revenueByCategory: Observable<IRevenueByCategory[]>;

    public soldItemsByCategoryData: {
        dataset: {
            data: number[],
            label?: string,
        },
        labels: string[],
    } = null;
    public revenueByCategoryData: {
        dataset: {
            data: number[],
            label?: string,
        },
        labels: string[],
    } = null;
    public readonly lineChartColors = [
        {
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)',
        },
    ];

    private readonly trackSubscription = trackSubscription.bind(this);

    constructor(
        private catalogActions: CatalogActions,
        public location: Location,
    ) { }

    ngOnInit() {
        this.catalogActions.fetchCategories();
        this.catalogActions.buildChartDataSets();

        this.trackSubscription(
            Observable.
                combineLatest(
                    this.categories.filter((categories) => !!categories),
                    this.soldItemsByCategory.filter((soldItemsByCategory) => !!soldItemsByCategory),
                    (categories, soldItemsByCategory) => ({
                        categories,
                        soldItemsByCategory,
                    })
                ).subscribe(({ categories, soldItemsByCategory }) => this.soldItemsByCategoryData = {
                    dataset: {
                        data: soldItemsByCategory.map((statistic) => statistic.count),
                        label: 'Items',
                    },
                    labels: soldItemsByCategory.
                        map((statistic) => categories.find((category) => category.id === statistic.categoryId)).
                        map((category) => category ? category.name : ''),
                }),
        );

        this.trackSubscription(
            Observable.
                combineLatest(
                    this.categories.filter((categories) => !!categories),
                    this.revenueByCategory.filter((revenueByCategory) => !!revenueByCategory),
                    (categories, revenueByCategory) => ({
                        categories,
                        revenueByCategory,
                    })
                ).subscribe(({ categories, revenueByCategory }) => this.revenueByCategoryData = {
                    dataset: {
                        data: revenueByCategory.map((statistic) => statistic.sold),
                        label: 'Revenue',
                    },
                    labels: revenueByCategory.
                        map((statistic) => categories.find((category) => category.id === statistic.categoryId)).
                        map((category) => category ? category.name : ''),
                }),
        );
    }

    ngOnDestroy() {
        this.catalogActions.clearChartDataSets();
    }
}
