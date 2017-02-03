import { combineReducers } from 'redux';

import { chartReducer, IChartStore } from './catalog-chart.reducer';
import { filterReducer, IFilterStore } from './catalog-filter.reducer';
import { IPersistentStore, persistentReducer } from './catalog-persistent.reducer';
import { ISellStore, sellReducer } from './catalog-sell.reducer';

export class ICatalogStore {
    filter?: IFilterStore;
    persistent?: IPersistentStore;
    sell?: ISellStore;
    chart?: IChartStore;
};

export const catalogReducer = combineReducers<ICatalogStore>({
    filter: filterReducer,
    persistent: persistentReducer,
    sell: sellReducer,
    chart: chartReducer,
});
