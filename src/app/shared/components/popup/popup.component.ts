import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: [
        './popup.component.scss',
        './button.component.scss',
    ],
})
export class PopupComponent {
    @Input() public caption: string;
    @Input() public showButtons: boolean = true;
    @Output() public okPressed = new EventEmitter();
    @Output() public cancelPressed = new EventEmitter();
}
