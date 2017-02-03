import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/sampleTime';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { getElementOffset, isDeepEqual } from './../../../helpers';
import { IRange } from './../../models';

enum TrackSlider {
    Left,
    Right,
}

@Component({
    selector: 'app-range',
    templateUrl: './range.component.html',
    styleUrls: ['./range.component.scss'],
})
export class RangeComponent implements OnInit, OnDestroy {
    @Input() public caption: string;
    @Input() public min: number = 0;
    @Input() public max: number = 100;
    @Input() public step: number = 1;
    @Input() public left: number = null;
    @Input() public right: number = null;

    @Output() public change: EventEmitter<IRange> = new EventEmitter<IRange>();

    @ViewChild('range') private rangeElement: ElementRef;

    public leftPosition: number = null;
    public rightPosition: number = null;
    public trackSlider: typeof TrackSlider = TrackSlider;
    public tracking: TrackSlider = null;
    public lastTouchedSlider: TrackSlider = TrackSlider.Right;

    private mousePosition: Subject<{ position: number, slider: TrackSlider }> =
        new Subject<{ position: number, slider: TrackSlider }>();
    private cachedElementOffset: { left: number, width: number } = null;
    private readonly subscriptions: Subscription[] = [];

    public ngOnInit() {
        this.fixInputValues();

        const range = this.max - this.min;

        this.leftPosition = (this.left - this.min) / range;
        this.rightPosition = (this.right - this.min) / range;

        const delta = 1 / (range / this.step);

        this.subscriptions.push(
            this.mousePosition.
                sampleTime(200).
                map(({ position, slider }) => ({
                    position: Math.round(position / delta) * delta,
                    slider,
                })).
                distinctUntilChanged(isDeepEqual).
                subscribe(({ position, slider }) => {
                    if (slider === TrackSlider.Left) {
                        this.leftPosition = position;
                    } else if (slider === TrackSlider.Right) {
                        this.rightPosition = position;
                    }

                    this.change.emit({
                        min: this.getRealValueByPosition(this.leftPosition),
                        max: this.getRealValueByPosition(this.rightPosition),
                    });
                }),
        );
    }

    public ngOnDestroy() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
    }

    @HostListener('window:mousemove', ['$event'])
    public mouseMove({ clientX }: MouseEvent) {
        if (this.tracking === null) {
            return;
        }

        const { left, width } = this.cachedElementOffset;

        const positionValue = (clientX - left) / width;

        if (this.tracking === TrackSlider.Left) {
            this.mousePosition.next({
                position: Math.max(Math.min(positionValue, this.rightPosition), 0),
                slider: TrackSlider.Left,
            });
        } else if (this.tracking === TrackSlider.Right) {
            this.mousePosition.next({
                position: Math.min(Math.max(positionValue, this.leftPosition), 1),
                slider: TrackSlider.Right,
            });
        }
    }

    @HostListener('window:mouseup', ['$event'])
    public mouseUp(event: MouseEvent) {
        this.tracking = null;
    }

    public mouseDown(trackSlider: TrackSlider) {
        this.tracking = trackSlider;
        this.lastTouchedSlider = trackSlider;

        this.cachedElementOffset = getElementOffset(this.rangeElement.nativeElement);
    }

    public getRealValueByPosition(position: number): number {
        const restoredValue = position * (this.max - this.min) + this.min;

        return Math.round(restoredValue / this.step) * this.step;
    }

    private fixInputValues() {
        if (this.min > this.max) {
            const min = this.min;
            this.min = this.max;
            this.max = min;
        }

        if (this.left === null || this.left < this.min) {
            this.left = this.min;
        } else if (this.left > this.max) {
            this.left = this.max;
        }

        if (this.right === null || this.right > this.max) {
            this.right = this.max;
        } else if (this.right < this.min) {
            this.right = this.min;
        }

        if (this.left > this.right) {
            const left = this.left;
            this.left = this.right;
            this.right = left;
        }

        if (this.left > this.min + (this.max - this.min) / 2) {
            this.lastTouchedSlider = TrackSlider.Left;
        }
    }
}
