/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ControlCaptionComponent } from './control-caption.component';

describe('ProductComponent', () => {
    let component: ControlCaptionComponent;
    let fixture: ComponentFixture<ControlCaptionComponent>;

    beforeEach(async(() => {
        TestBed.
            configureTestingModule({ declarations: [ControlCaptionComponent] }).
            compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ControlCaptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
