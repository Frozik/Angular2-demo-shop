import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

const subscriptionsSymbol = Symbol('subscriptions');

const hookObject: OnDestroy = {
    ngOnDestroy() {
        const subscriptions: Subscription[] = this[subscriptionsSymbol];

        while (subscriptions.length) {
            subscriptions.pop().unsubscribe();
        }
    },
};

export function trackSubscription(subscription: Subscription) {
    if (!subscription) {
        return;
    }

    if (!this) {
        throw new Error(`Method "${trackSubscription.name}" should be bound to the component`);
    }

    const subscriptions = this[subscriptionsSymbol];

    if (!subscriptions) {
        const componentConstructor = Reflect.getPrototypeOf(this).constructor;
        const componentName = componentConstructor && componentConstructor.name || 'Component';

        throw new Error(`"${componentName}" should have "@${SubscriptionComponent.name}()" decorator`);
    }

    subscriptions.push(subscription);
}

export function SubscriptionComponent(): ClassDecorator {
    return (target: Function) => {
        for (const methodName of Reflect.ownKeys(hookObject)) {
            const targetPrototype = target.prototype;

            const methodDescriptor = Reflect.getOwnPropertyDescriptor(targetPrototype, methodName);
            if (methodDescriptor) {
                const { configurable } = methodDescriptor;

                if (!configurable) {
                    throw new Error(`Can't hook "${
                            methodName
                        }" of the "${
                            target.name || 'Component'
                        }" as it isn't configurable`,
                    );
                }

                const methodToHook: Function = methodDescriptor.value;

                const value = function hookMethod(...params: any[]) {
                    Reflect.apply(methodToHook, this, params);

                    Reflect.apply(hookObject[methodName], this, params);
                };

                const { writable, enumerable } = methodDescriptor;

                Reflect.defineProperty(targetPrototype, methodName, {
                    value,
                    writable,
                    configurable,
                    enumerable,
                });
            } else {
                Reflect.defineProperty(targetPrototype, methodName, {
                    value: hookObject[methodName],
                });
            }

            Reflect.defineProperty(targetPrototype, subscriptionsSymbol, {
                enumerable: false,
                writable: false,
                value: [],
            });
        }
    };
}
