import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { IAppState } from './../../app.store';
import { AuthService } from './../../auth/auth.service';
import { Role } from './../../auth/models';
import { ISubscriptionTracker } from './../../core/models';
import { SubscriptionTrackerService } from './../../core/subscription-tracker.service';
import { CatalogActions } from './../catalog.actions';
import { ICategory, IProduct } from './../models';

enum Popup {
    None,
    AddCategory,
    DeleteCategory,
    AddProduct,
}

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
    @select((state: IAppState) => state.catalog.persistent.categories)
    public categories: Observable<ICategory[]>;

    public sidebarShown:  boolean = false;
    public popup: Popup = Popup.None;
    public popupType: typeof Popup = Popup;
    public showAdminControls: boolean = false;

    private readonly subscriptionTracker: ISubscriptionTracker;

    public constructor(
        private authService: AuthService,
        private catalogActions: CatalogActions,
        subscriptionTrackerService: SubscriptionTrackerService,
        viewContainerRef: ViewContainerRef,
    ) {
        this.subscriptionTracker = subscriptionTrackerService.buildTracker(viewContainerRef);
    }

    public ngOnInit() {
        if (this.authService.credentials.role === Role.administrator) {
            this.subscriptionTracker.push(
                this.categories.subscribe((categories) => this.showAdminControls = !!categories),
            );
        }
    }

    public addCategory(name: string) {
        const trimmedName = (name || '').trim();
        if (!trimmedName) {
            return;
        }

        this.catalogActions.addCategory(trimmedName);
    }

    public deleteCategory(categoryId: string) {
        this.catalogActions.deleteCategory(parseInt(categoryId, 10));
    }

    public addProduct(product: IProduct) {
        this.catalogActions.addProduct(product);
    }
}
