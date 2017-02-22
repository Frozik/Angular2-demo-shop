import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
    @Input() public caption: string;
    @Input() public checked = false;
    @Input() public text: string = null;

    @Output() public checkedChanged = new EventEmitter();
}
