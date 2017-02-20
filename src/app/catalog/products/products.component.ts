import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IAppState } from './../../app.store';
import { AuthService } from './../../auth/auth.service';
import { Role } from './../../auth/models';
import { SubscriptionComponent, trackSubscription } from './../../helpers/subscription-component.decorator';
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
@SubscriptionComponent()
export class ProductsComponent implements OnInit {
    @select((state: IAppState) => state.catalog.persistent.categories)
    public categories: Observable<ICategory[]>;

    public sidebarShown: boolean = false;
    public popup: Popup = Popup.None;
    public popupType: typeof Popup = Popup;
    public showAdminControls: boolean = false;

    private readonly trackSubscription = trackSubscription.bind(this);

    public constructor(
        private authService: AuthService,
        private catalogActions: CatalogActions,
    ) { }

    public ngOnInit() {
        if (this.authService.credentials.role === Role.administrator) {
            this.trackSubscription(
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
