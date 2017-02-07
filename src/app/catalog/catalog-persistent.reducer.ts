import { AppActions } from './../app.actions';
import { CatalogActions } from './../catalog/catalog.actions';
import { ICategory } from './../catalog/models';
import { IPayloadAction } from './../redux-action.type';

export interface IPersistentStore {
    categories: ICategory[];
}

const initialState: IPersistentStore = {
    categories: null,
};

export function persistentReducer(
    state: IPersistentStore = initialState,
    action: IPayloadAction,
): IPersistentStore {
    const { type, payload } = action;

    switch (type) {
        case AppActions.ResetCache:
            return initialState;

        case CatalogActions.StoreCategories:
            return {
                categories: payload as ICategory[],
            };

        default:
            return state;
    }
}
