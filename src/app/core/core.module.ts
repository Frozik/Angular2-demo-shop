import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { CloseSubscriptionsComponent } from './helpers/clean-subscriptions.component';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { SubscriptionTrackerService } from './subscription-tracker.service';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        BrowserModule,
    ],
    declarations: [CloseSubscriptionsComponent],
    providers: [SubscriptionTrackerService],
    entryComponents: [ CloseSubscriptionsComponent ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
