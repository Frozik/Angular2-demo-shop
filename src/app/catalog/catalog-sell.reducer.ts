import { AppActions } from './../app.actions';
import { CatalogActions } from './../catalog/catalog.actions';
import { SellState } from './../catalog/models';
import { IPayloadAction } from './../redux-action.type';

export interface ISellStore {
    sellState: SellState;
}

const initialState: ISellStore = {
    sellState: SellState.None,
};

export function sellReducer(
    state: ISellStore = initialState,
    action: IPayloadAction,
): ISellStore {
    const { type, payload } = action;

    switch (type) {
        case AppActions.ResetCache:
            return initialState;

        case CatalogActions.SetSellState:
            return {
                sellState: payload as SellState,
            };

        default:
            return state;
    }
}
