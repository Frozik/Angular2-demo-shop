import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
    @Input() public caption: string;
    @Input() public items: any[] = null;
    @Input() public selectedKey: any = null;
    @Input() public keyProperty: string = null;
    @Input() public displayProperty: string = null;

    @Output() public changed = new EventEmitter();

    public valueChanged(index: string) {
        if (!this.items) {
            this.changed.emit(null);
        }

        this.changed.emit(this.items[parseInt(index, 10)][this.keyProperty]);
    }
}
