import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-radiobox',
    templateUrl: './radiobox.component.html',
    styleUrls: ['./radiobox.component.scss'],
})
export class RadioboxComponent {
    @Input() public caption: string;
    @Input() public items: any[] = null;
    @Input() public selectedKey: any = null;
    @Input() public keyProperty: string = null;
    @Input() public displayProperty: string = null;

    @Output() public change = new EventEmitter();
}
