/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProductPopupComponent } from './product-popup.component';

describe('ProductListComponent', () => {
    let component: ProductPopupComponent;
    let fixture: ComponentFixture<ProductPopupComponent>;

    beforeEach(async(() => {
        TestBed.
            configureTestingModule({ declarations: [ProductPopupComponent] }).
            compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
