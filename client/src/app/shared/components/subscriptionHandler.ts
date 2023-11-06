import { Subscription } from 'rxjs';

export class SubscriptionHandler {
    private subscriptionsCollection: Subscription[] = [];

    set subscriptions(subscription: Subscription) {
        this.subscriptionsCollection.push(subscription);
    }

    unsubscribeAll() {
        this.subscriptionsCollection.forEach((s) => s.unsubscribe());
    }
}
