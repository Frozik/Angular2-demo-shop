/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PopupComponent } from './popup.component';

describe('ProductComponent', () => {
    let component: PopupComponent;
    let fixture: ComponentFixture<PopupComponent>;

    beforeEach(async(() => {
        TestBed.
            configureTestingModule({ declarations: [PopupComponent] }).
            compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
