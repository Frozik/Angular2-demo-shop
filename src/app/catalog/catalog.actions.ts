import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/zip';
import { Subscription } from 'rxjs/Subscription';

import { IAppState } from './../app.store';
import { isDeepEqual } from './../helpers';
import {
    addCategory,
    deleteCategory,
    fetchCategories,
} from './data/categories.data';
import {
    addProduct,
    addProductsToWarehouse,
    deleteProduct,
    fetchProduct,
    fetchProducts,
    getSoldByCategory,
    getSoldPriceByCategory,
    sellProduct,
    updateProductDetails,
} from './data/products.data';
import { IProduct, IProductFilter, SellState } from './models';

@Injectable()
export class CatalogActions {
    public static StoreCategories = 'catalog-store-categories';
    public static ClearProducts = 'catalog-clear-products';
    public static LoadingNextProductsPage = 'catalog-loading-products';
    public static AppendPageProducts = 'catalog-append-products';
    public static FinalizeProductsStream = 'catalog-finalize-products';
    public static StoreProduct = 'catalog-store-product';
    public static StoreFilter = 'catalog-store-filter';
    public static ClearChartDataSets = 'catalog-clear-data-sets';
    public static StoreChartCountByCategory = 'catalog-store-chart-count';
    public static StoreChartSoldByCategory = 'catalog-store-chart-sold';

    public static SetSellState = 'catalog-set-sell-state';

    private categorySubscription: Subscription = Subscription.EMPTY;
    private productsSubscription: Subscription = Subscription.EMPTY;
    private productSubscription: Subscription = Subscription.EMPTY;

    constructor(private ngRedux: NgRedux<IAppState>) { }

    public fetchCategories() {
        const { catalog: { persistent: { categories: loadedCategories } } } = this.ngRedux.getState();

        if (!this.categorySubscription.closed || loadedCategories) {
            return;
        }

        this.categorySubscription = fetchCategories().
            subscribe((result) => this.ngRedux.dispatch({
                type: CatalogActions.StoreCategories,
                payload: result,
            }));
    }

    public saveFilter(filter: IProductFilter) {
        const { catalog: { filter: { filter: sourceFilter } } } = this.ngRedux.getState();

        if (isDeepEqual(filter, sourceFilter)) {
            return;
        }

        this.ngRedux.dispatch({
            type: CatalogActions.StoreFilter,
            payload: filter,
        });

        this.clearProducts();

        if (!this.productsSubscription.closed) {
            this.productsSubscription.unsubscribe();
        }

        this.fetchNextProductsPage();
    }

    public fetchNextProductsPage() {
        if (!this.productsSubscription.closed) {
            return;
        }

        const { catalog: { filter: {
            filter,
            nextPage,
            endOfProductsStream,
        } } } = this.ngRedux.getState();

        if (endOfProductsStream) {
            return;
        }

        this.ngRedux.dispatch({ type: CatalogActions.LoadingNextProductsPage });

        const productsPerPage = 5;

        this.productsSubscription = fetchProducts(filter, nextPage, productsPerPage).
            subscribe((products) => {
                if (products && products.length >= 0) {
                    this.ngRedux.dispatch({
                        type: CatalogActions.AppendPageProducts,
                        payload: products,
                    });
                }

                if (!products || products.length < productsPerPage) {
                    this.ngRedux.dispatch({ type: CatalogActions.FinalizeProductsStream });
                }
            });
    }

    public fetchProduct(productId: number) {
        const { catalog: { filter: { products: loadedProducts } } } = this.ngRedux.getState();
        const product = loadedProducts
            ? loadedProducts.find((innerProduct) => innerProduct.id === productId)
            : undefined;

        this.ngRedux.dispatch({
            type: CatalogActions.StoreProduct,
            payload: product,
        });

        if (product) {
            return;
        }

        if (this.productSubscription) {
            this.productSubscription.unsubscribe();
        }

        this.productSubscription = fetchProduct(productId).
            subscribe((result: IProduct) => this.ngRedux.dispatch({
                type: CatalogActions.StoreProduct,
                payload: result,
            }));
    }

    public clearProducts() {
        this.ngRedux.dispatch({ type: CatalogActions.ClearProducts });
    }

    public clearProduct() {
        this.ngRedux.dispatch({
            type: CatalogActions.StoreProduct,
            payload: null,
        });
    }

    public clearSellState() {
        this.ngRedux.dispatch({
            type: CatalogActions.SetSellState,
            payload: SellState.None,
        });
    }

    public sellProduct(productId: number) {
        this.ngRedux.dispatch({
            type: CatalogActions.SetSellState,
            payload: SellState.Selling,
        });

        sellProduct(productId).subscribe((operationResult) => {
            this.clearProducts();
            this.fetchProduct(productId);

            this.ngRedux.dispatch({
                type: CatalogActions.SetSellState,
                payload: operationResult ? SellState.Sold : SellState.Error,
            });
        });
    }

    public addProductsToWarehouse(productId: number, count: number) {
        addProductsToWarehouse(productId, count);

        this.clearProducts();
        this.fetchProduct(productId);
    }

    public updateProductDetails(product: IProduct) {
        updateProductDetails(product);

        this.clearProducts();
        this.fetchProduct(product.id);
    }

    public deleteProduct(productId: number) {
        deleteProduct(productId);

        this.clearProducts();
        this.clearProduct();
    }

    public clearChartDataSets() {
        this.ngRedux.dispatch({ type: CatalogActions.ClearChartDataSets });
    }

    public buildChartDataSets() {
        getSoldByCategory().subscribe((result) => this.ngRedux.dispatch({
            type: CatalogActions.StoreChartCountByCategory,
            payload: result,
        }));

        getSoldPriceByCategory().subscribe((result) => this.ngRedux.dispatch({
            type: CatalogActions.StoreChartSoldByCategory,
            payload: result,
        }));
    }

    private resetCategories() {
        this.ngRedux.dispatch({
            type: CatalogActions.StoreCategories,
            payload: null,
        });

        this.categorySubscription.unsubscribe();
    }

    public addCategory(name: string) {
        const storeCategories = this.ngRedux.getState().catalog.persistent.categories;

        this.resetCategories();

        addCategory(name).subscribe((result) => {
            if (!result && storeCategories) {
                this.ngRedux.dispatch({
                    type: CatalogActions.StoreCategories,
                    payload: storeCategories,
                });

                return;
            }

            this.resetCategories();

            this.fetchCategories();
        });
    }

    public deleteCategory(categoryId: number) {
        const storeCategories = this.ngRedux.getState().catalog.persistent.categories;

        this.resetCategories();

        deleteCategory(categoryId).subscribe((result) => {
            if (!result && storeCategories) {
                this.ngRedux.dispatch({
                    type: CatalogActions.StoreCategories,
                    payload: storeCategories,
                });

                return;
            }

            this.resetCategories();

            this.fetchCategories();
        });
    }

    public addProduct(product: IProduct) {
        addProduct(product).subscribe((result) => {
            if (!result) {
                return;
            }

            this.clearProducts();

            this.fetchNextProductsPage();
        });
    }
}
