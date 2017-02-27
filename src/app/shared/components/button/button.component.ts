import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Output,
} from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
    @Input() public caption: string;
    @Input() public disabled = false;

    @Output() public pressed = new EventEmitter();

    public mousePressed = false;
    public mouseHover = false;

    buttonClicked(event: MouseEvent) {
        if (!this.disabled) {
            this.pressed.emit(event);
        }
    }

    mouseDown(event: MouseEvent) {
        if (!this.disabled) {
            this.mousePressed = true;
        }
    }

    mouseEnter(event: MouseEvent) {
        this.mouseHover = true;
    }

    mouseLeave(event: MouseEvent) {
        this.mouseHover = false;
    }

    @HostListener('window:mouseup', ['$event'])
    public mouseUp(event: MouseEvent) {
        this.mousePressed = false;
    }
}
