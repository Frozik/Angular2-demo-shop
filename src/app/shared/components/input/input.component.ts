import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class InputComponent {
    @Input() public caption: string;
    @Input() public value = '';

    @Output() public changed = new EventEmitter();
}
