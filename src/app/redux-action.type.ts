import * as Redux from 'redux';

export interface IPayloadAction extends Redux.Action {
    payload?: any;
}
