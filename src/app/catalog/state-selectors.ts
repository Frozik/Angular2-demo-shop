import { IAppState } from './../app.store';
import {
    ICategory,
    IProduct,
    IProductFilter,
    IRevenueByCategory,
    ISoldItemsByCategory,
    SellState,
} from './models';

export function selectCategories(state: IAppState): ICategory[] {
    return state.catalog.persistent.categories;
}

export function selectFilter(state: IAppState): IProductFilter {
    return state.catalog.filter.filter;
}

export function selectFilterProducts(state: IAppState): IProduct[] {
    return state.catalog.filter.products;
}

export function selectFilterProduct(state: IAppState): IProduct {
    return state.catalog.filter.product;
}

export function selectFilterLoading(state: IAppState): boolean {
    return state.catalog.filter.loading;
}

export function selectFilterEndOfStream(state: IAppState): boolean {
    return state.catalog.filter.endOfProductsStream;
}

export function selectSellState(state: IAppState): SellState {
    return state.catalog.sell.sellState;
}

export function selectChartSoldByCategory(state: IAppState): ISoldItemsByCategory[] {
    return state.catalog.chart.soldByCategory;
}

export function selectChartSoldPriceByCategory(state: IAppState): IRevenueByCategory[] {
    return state.catalog.chart.soldPriceByCategory;
}
