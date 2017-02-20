/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ModalPopupComponent } from './modal-popup.component';

describe('ProductComponent', () => {
    let component: ModalPopupComponent;
    let fixture: ComponentFixture<ModalPopupComponent>;

    beforeEach(async(() => {
        TestBed.
            configureTestingModule({ declarations: [ModalPopupComponent] }).
            compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
