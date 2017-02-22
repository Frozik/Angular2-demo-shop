import { NgRedux, select } from '@angular-redux/store';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/startWith';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { IAppState } from './../../app.store';
import { AuthService } from './../../auth/auth.service';
import { getElementOffset } from './../../helpers';
import { SubscriptionComponent, trackSubscription } from './../../helpers/subscription-component.decorator';
import { CatalogActions } from './../catalog.actions';
import { ICategory, IProduct } from './../models';
import {
    selectCategories,
    selectFilterEndOfStream,
    selectFilterLoading,
    selectFilterProducts,
} from './../state-selectors';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
@SubscriptionComponent()
export class ProductListComponent implements OnInit {
    @ViewChild('endOfListMarker') private endOfListMarker: ElementRef;

    @select(selectCategories) public categories: Observable<ICategory[]>;
    @select(selectFilterProducts) public products: Observable<IProduct[]>;
    @select(selectFilterLoading) public fetching: Observable<boolean>;
    @select(selectFilterEndOfStream) public endOfProductsStream: Observable<boolean>;

    public windowScrolledSubject: Subject<Event> = new Subject<Event>();

    private readonly trackSubscription = trackSubscription.bind(this);

    public constructor(
        private router: Router,
        private ngRedux: NgRedux<IAppState>,
        private catalogActions: CatalogActions,
        private authService: AuthService,
    ) { }

    public ngOnInit() {
        this.catalogActions.fetchCategories();

        this.trackSubscription(
            Observable.
                combineLatest(
                    this.categories,
                    this.products,
                    this.fetching,
                    this.endOfProductsStream,
                    this.windowScrolledSubject.startWith(null),
                    (
                        categories,
                        products,
                        fetching,
                        endOfProductsStream,
                        windowScrolledEvent,
                    ): { canRequestNextPage: boolean, windowScrolledEvent: Event } => ({
                        canRequestNextPage: !fetching &&
                            !endOfProductsStream &&
                            !!categories,
                        windowScrolledEvent,
                    }),
                ).
                skipWhile(({ canRequestNextPage }) => !canRequestNextPage).
                map(({ windowScrolledEvent }) => windowScrolledEvent).
                debounceTime(500).
                subscribe(this.checkShouldLoadNextPage.bind(this)),
            );
    }

    @HostListener('window:scroll', ['$event'])
    protected windowScrolled(event: Event) {
        this.windowScrolledSubject.next(event);
    }

    @HostListener('window:resize', ['$event'])
    protected windowResized(event: Event) {
        this.windowScrolledSubject.next(event);
    }

    public showProductDetails(product: IProduct) {
        this.router.navigate(['catalog', 'product', product.id]);
    }

    private checkShouldLoadNextPage() {
        if (!this.endOfListMarker || !this.endOfListMarker.nativeElement) {
            return;
        }

        const { endOfListMarker: { nativeElement: eolElement } } = this;

        const offset = getElementOffset(eolElement);

        if (!offset) {
            return;
        }

        const proactiveOffset = 50;
        const { pageYOffset, innerHeight } = window;

        const hasReachedEndOfList = offset.top - proactiveOffset < pageYOffset + innerHeight;

        if (!hasReachedEndOfList) {
            return;
        }

        this.catalogActions.fetchNextProductsPage();
    }
}
