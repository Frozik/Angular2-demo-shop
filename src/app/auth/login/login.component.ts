import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    public form: FormGroup;
    public incorrectLogin: boolean = false;

    private readonly subscriptions: Subscription[] = [];

    constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: [''],
            password: [''],
        });

        this.subscriptions.push(
            this.form.valueChanges.subscribe(() => this.incorrectLogin = false),
        );
    }

    public ngOnDestroy() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

    login(username: string, password: string) {
        this.authService.login(username, password).
            first().
            subscribe((successfullyLoggedIn) => {
                if (successfullyLoggedIn) {
                    this.authService.navigateFromLogin();

                    return;
                }

                this.incorrectLogin = true;
            });
    }
}
