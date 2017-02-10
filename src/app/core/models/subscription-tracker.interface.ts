import { Subscription } from 'rxjs/Subscription';

export interface ISubscriptionTracker {
    push(subscription: Subscription);
}
