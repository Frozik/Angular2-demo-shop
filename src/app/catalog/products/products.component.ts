import { Component } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { IAppState } from './../../app.store';
import { AuthService } from './../../auth/auth.service';
import { Role } from './../../auth/models';
import { CatalogActions } from './../catalog.actions';
import { ICategory } from './../models';

enum Popup {
    None,
    AddCategory,
    DeleteCategory,
}

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
    @select((state: IAppState) => state.catalog.persistent.categories)
    public categories: Observable<ICategory[]>;

    public sidebarShown:  boolean = false;
    public popup: Popup = Popup.None;
    public roles: typeof Role = Role;
    public popupType: typeof Popup = Popup;

    constructor(
        public authService: AuthService,
        private catalogActions: CatalogActions,
    ) { }

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
}
