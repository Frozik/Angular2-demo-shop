import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({ template: '' })
export class CloseSubscriptionsComponent implements OnDestroy {
    private readonly subscriptions: Subscription[] = [];

    public push(subscription: Subscription) {
        this.subscriptions.push(subscription);
    }

    public ngOnDestroy() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }
}
