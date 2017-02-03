/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ChartsComponent } from './charts.component';

describe('ProductComponent', () => {
    let component: ChartsComponent;
    let fixture: ComponentFixture<ChartsComponent>;

    beforeEach(async(() => {
        TestBed.
            configureTestingModule({ declarations: [ChartsComponent] }).
            compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChartsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
