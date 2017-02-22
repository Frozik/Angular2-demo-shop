import { Directive, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

import { numberRangeValidator } from './number-range-validator.function';

@Directive({
    selector: '[appNumberRange][ngModel],[appNumberRange][formControl],[appNumberRange][formControlName]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => NumberRangeValidatorDirective),
            multi: true,
        },
    ],
})
export class NumberRangeValidatorDirective implements OnInit, Validator {
    @Input() private appNumberRange: { minValue: number, maxValue: number } = null;

    private validator: ValidatorFn;

    public ngOnInit() {
        const { minValue = -Infinity, maxValue = Infinity } = this.appNumberRange || {};

        this.validator = numberRangeValidator(minValue, maxValue);
    }

    validate(control: AbstractControl) {
        return this.validator(control);
    }
}
