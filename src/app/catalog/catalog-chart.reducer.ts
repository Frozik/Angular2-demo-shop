import { AppActions } from './../app.actions';
import { CatalogActions } from './../catalog/catalog.actions';
import { IPayloadAction } from './../redux-action.type';
import { IRevenueByCategory, ISoldItemsByCategory } from './models';

export interface IChartStore {
    soldByCategory: ISoldItemsByCategory[];
    soldPriceByCategory: IRevenueByCategory[];
}

const initialState: IChartStore = {
    soldByCategory: null,
    soldPriceByCategory: null,
};

export function chartReducer(
    state: IChartStore = initialState,
    action: IPayloadAction,
): IChartStore {
    const { type, payload } = action;

    switch (type) {
        case AppActions.ResetCache:
            return initialState;

        case CatalogActions.ClearChartDataSets:
            return {
                soldByCategory: null,
                soldPriceByCategory: null,
            };

        case CatalogActions.StoreChartCountByCategory:
            return {
                soldByCategory: payload as Array<{ count: number, categoryId: number }>,
                soldPriceByCategory: state.soldPriceByCategory,
            };

        case CatalogActions.StoreChartSoldByCategory:
            return {
                soldByCategory: state.soldByCategory,
                soldPriceByCategory: payload as Array<{ sold: number, categoryId: number }>,
            };

        default:
            return state;
    }
}
