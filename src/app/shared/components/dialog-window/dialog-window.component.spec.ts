/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DialogWindowComponent } from './dialog-window.component';

describe('ProductComponent', () => {
    let component: DialogWindowComponent;
    let fixture: ComponentFixture<DialogWindowComponent>;

    beforeEach(async(() => {
        TestBed.
            configureTestingModule({ declarations: [DialogWindowComponent] }).
            compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogWindowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
