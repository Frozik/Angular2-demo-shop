import { ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ISubscriptionTracker } from './../models';
import { CloseSubscriptionsComponent } from './clean-subscriptions.component';

export class SubscriptionTracker implements ISubscriptionTracker {
    private subscriptionsComponentRef: ComponentRef<CloseSubscriptionsComponent> = null;

    public constructor(
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

    public push(subscription: Subscription) {
        if (!subscription) {
            return;
        }

        if (!this.subscriptionsComponentRef) {
            const spyComponent = this.componentFactoryResolver.resolveComponentFactory(CloseSubscriptionsComponent);

            this.subscriptionsComponentRef = this.viewContainerRef.createComponent(spyComponent);
        }

        this.subscriptionsComponentRef.instance.push(subscription);
    }
}
