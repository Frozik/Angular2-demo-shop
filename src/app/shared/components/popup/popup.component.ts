import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit, OnDestroy {
    @Input() public caption: string;
    @Input() public showButtons: boolean = true;
    @Input() public formGroup: FormGroup;
    @Output() public okPressed = new EventEmitter();
    @Output() public cancelPressed = new EventEmitter();

    public disabledOkButton: boolean = false;

    private formStatusSubscription: Subscription = null;

    ngOnInit() {
        if (this.formGroup) {
            this.disabledOkButton = true;

            this.formStatusSubscription = this.formGroup.statusChanges.
                filter((status) => !this.formGroup.pending).
                map(() => !this.formGroup.pending && this.formGroup.valid).
                distinctUntilChanged().
                subscribe((valid) => this.disabledOkButton = !valid);
        }
    }

    ngOnDestroy() {
        if (this.formStatusSubscription) {
            this.formStatusSubscription.unsubscribe();
        }
    }
}
