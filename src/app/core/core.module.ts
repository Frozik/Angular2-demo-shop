import { NgReduxModule } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { GlobalErrorHandler } from './global-error-handler.class';
import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        BrowserModule,
        NgReduxModule,
    ],
    providers: [
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
    ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
