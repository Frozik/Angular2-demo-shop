import { combineReducers } from 'redux';
import * as persistState from 'redux-localstorage';

import { authReducer, IAuthStore } from './auth/auth.reducer';
import { catalogReducer, ICatalogStore } from './catalog/catalog.store';

export class IAppState {
    auth?: IAuthStore;
    catalog?: ICatalogStore;
};

export const rootReducer = combineReducers<IAppState>({
    auth: authReducer,
    catalog: catalogReducer,
});

export const enhancers = [
    persistState('auth', { key: 'grid-dynamics/demo-shop/auth' }),
];
