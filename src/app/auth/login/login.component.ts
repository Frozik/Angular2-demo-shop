import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AppActions } from './../../app.actions';
import { ISubscriptionTracker } from './../../core/models';
import { SubscriptionTrackerService } from './../../core/subscription-tracker.service';
import { AuthService } from './../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public form: FormGroup;
    public incorrectLogin: boolean = false;

    private readonly subscriptionTracker: ISubscriptionTracker;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private appActions: AppActions,
        subscriptionTrackerService: SubscriptionTrackerService,
        viewContainerRef: ViewContainerRef,
    ) {
        this.subscriptionTracker = subscriptionTrackerService.buildTracker(viewContainerRef);
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: [''],
            password: [''],
        });

        this.subscriptionTracker.push(
            this.form.valueChanges.subscribe(() => this.incorrectLogin = false),
        );
    }

    login(username: string, password: string) {
        this.authService.login(username, password).
            first().
            subscribe((successfullyLoggedIn) => {
                if (successfullyLoggedIn) {
                    this.appActions.resetCache();

                    this.authService.navigateFromLogin();

                    return;
                }

                this.incorrectLogin = true;
            });
    }
}
