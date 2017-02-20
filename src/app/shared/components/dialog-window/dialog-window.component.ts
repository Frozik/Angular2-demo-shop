import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-dialog-window',
    templateUrl: './dialog-window.component.html',
    styleUrls: ['./dialog-window.component.scss'],
})
export class DialogWindowComponent {
    @Input() public caption: string;
    @Input() public okButtonDisabled = false;

    @Output() public okPressed = new EventEmitter();
    @Output() public cancelPressed = new EventEmitter();
}
