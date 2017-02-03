import { Component } from '@angular/core';
import { DevToolsExtension, NgRedux } from 'ng2-redux';
import * as Redux from 'redux';

// TypeScript fails to resolve 'redux-logger' module
// tslint:disable-next-line:no-var-requires
const createLogger = require('redux-logger');

import { enhancers, IAppState, rootReducer } from './../app.store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(
        private ngRedux: NgRedux<IAppState>,
        private devTool: DevToolsExtension,
    ) {
        const initialState: IAppState = { };
        const middleware: Redux.Middleware[] = [createLogger()];
        const storeEnhancers: Array<Redux.StoreEnhancer<IAppState>> = devTool.isEnabled()
            ? [...enhancers, devTool.enhancer()]
            : [...enhancers];

        this.ngRedux.configureStore(rootReducer, initialState, middleware, storeEnhancers);
    }
}
