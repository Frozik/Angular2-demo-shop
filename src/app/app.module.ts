import { DevToolsExtension, NgRedux } from '@angular-redux/store';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import * as Redux from 'redux';

// TypeScript fails to resolve 'redux-logger' module
// tslint:disable-next-line:no-var-requires
const createLogger = require('redux-logger');

import { AppRoutingModule } from './app-routing.module';
import { AppActions } from './app.actions';
import { enhancers, IAppState, rootReducer } from './app.store';
import { AppComponent } from './app/app.component';
import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';
import { configurationFactory, ConfigurationService } from './configuration.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    imports: [
        CoreModule,
        SharedModule,
        AppRoutingModule,
        CatalogModule,
        AuthModule,
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [
        ConfigurationService,
        AppActions,
        {
            provide: APP_INITIALIZER,
            useFactory: configurationFactory,
            deps: [ConfigurationService],
            multi: true
        },
    ],
})
export class AppModule {
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
