import { CatalogActions } from './../catalog/catalog.actions';
import { IProduct, IProductFilter } from './../catalog/models';
import { IPayloadAction } from './../redux-action.type';

export interface IFilterStore {
    filter: IProductFilter;
    products: IProduct[];
    nextPage: number;
    loading: boolean;
    endOfProductsStream: boolean;
    product: IProduct;
}

const initialState: IFilterStore = {
    filter: {
        availableOnly: false,
        gender: null,
        categoryId: null,
        rating: { min: 0, max: 5 },
        price: { min: 0, max: 1000 },
        text: '',
    },
    products: null,
    nextPage: 0,
    loading: false,
    endOfProductsStream: false,
    product: null,
};

export function filterReducer(
    state: IFilterStore = initialState,
    action: IPayloadAction,
): IFilterStore {
    const { type, payload } = action;

    switch (type) {
        case CatalogActions.ClearProducts:
            return {
                filter: state.filter,
                products: null,
                nextPage: 0,
                loading: false,
                endOfProductsStream: false,
                product: state.product,
            };

        case CatalogActions.LoadingNextProductsPage:
            return {
                filter: state.filter,
                products: state.products,
                nextPage: state.nextPage,
                loading: true,
                endOfProductsStream: state.endOfProductsStream,
                product: state.product,
            };

        case CatalogActions.AppendPageProducts:
            return {
                filter: state.filter,
                products: (state.products || []).concat(payload as IProduct[]),
                nextPage: state.nextPage + 1,
                loading: false,
                endOfProductsStream: state.endOfProductsStream,
                product: state.product,
            };

        case CatalogActions.FinalizeProductsStream:
            return {
                filter: state.filter,
                products: state.products,
                nextPage: state.nextPage,
                loading: false,
                endOfProductsStream: true,
                product: state.product,
            };

        case CatalogActions.StoreFilter:
            return {
                filter: payload as IProductFilter,
                products: state.products,
                nextPage: state.nextPage,
                loading: state.loading,
                endOfProductsStream: state.endOfProductsStream,
                product: state.product,
            };

        case CatalogActions.StoreProduct:
            return {
                filter: state.filter,
                products: state.products,
                nextPage: state.nextPage,
                loading: state.loading,
                endOfProductsStream: state.endOfProductsStream,
                product: payload as IProduct,
            };

        default:
            return state;
    }
}
