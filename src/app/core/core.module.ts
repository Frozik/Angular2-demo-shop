import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        BrowserModule,
    ],
    declarations: [],
    providers: [],
    exports: [],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
