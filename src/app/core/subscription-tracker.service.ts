import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

import { SubscriptionTracker } from './helpers/subscription-tracker.class';
import { ISubscriptionTracker } from './models';

@Injectable()
export class SubscriptionTrackerService {
    public constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

    public buildTracker(viewContainerRef: ViewContainerRef): ISubscriptionTracker {
        return new SubscriptionTracker(viewContainerRef, this.componentFactoryResolver);
    }
}

