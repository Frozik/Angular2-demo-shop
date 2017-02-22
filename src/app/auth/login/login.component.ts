import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AppActions } from './../../app.actions';
import { SubscriptionComponent, trackSubscription } from './../../helpers/subscription-component.decorator';
import { AuthService } from './../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
@SubscriptionComponent()
export class LoginComponent implements OnInit {
    public form: FormGroup;
    public incorrectLogin = false;

    private readonly trackSubscription = trackSubscription.bind(this);

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private appActions: AppActions,
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: [''],
            password: [''],
        });

        this.trackSubscription(
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
