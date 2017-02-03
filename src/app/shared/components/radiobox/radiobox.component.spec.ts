/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RadioboxComponent } from './radiobox.component';

describe('ProductComponent', () => {
    let component: RadioboxComponent;
    let fixture: ComponentFixture<RadioboxComponent>;

    beforeEach(async(() => {
        TestBed.
            configureTestingModule({ declarations: [RadioboxComponent] }).
            compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RadioboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
