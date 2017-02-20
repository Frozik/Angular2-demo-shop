import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';

import { IAppState } from './app.store';

@Injectable()
export class AppActions {
    public static ResetCache: string = 'reset-cache';

    constructor(private ngRedux: NgRedux<IAppState>) { }

    public resetCache() {
        this.ngRedux.dispatch({ type: AppActions.ResetCache });
    }
}
