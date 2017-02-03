/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CustomerControlsComponent } from './customer-controls.component';

describe('ProductListComponent', () => {
    let component: CustomerControlsComponent;
    let fixture: ComponentFixture<CustomerControlsComponent>;

    beforeEach(async(() => {
        TestBed.
            configureTestingModule({ declarations: [CustomerControlsComponent] }).
            compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerControlsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
