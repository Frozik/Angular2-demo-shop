/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AdministratorControlsComponent } from './administrator-controls.component';

describe('ProductListComponent', () => {
    let component: AdministratorControlsComponent;
    let fixture: ComponentFixture<AdministratorControlsComponent>;

    beforeEach(async(() => {
        TestBed.
            configureTestingModule({ declarations: [AdministratorControlsComponent] }).
            compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdministratorControlsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
