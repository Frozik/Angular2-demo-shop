import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-control-caption',
    templateUrl: './control-caption.component.html',
    styleUrls: ['./control-caption.component.scss'],
})
export class ControlCaptionComponent {
    @Input() public caption: string;
}
