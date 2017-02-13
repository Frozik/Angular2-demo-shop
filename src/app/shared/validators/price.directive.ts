import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

import { priceValidator } from './price-validator.function';

@Directive({
    selector: '[appPrice][ngModel],[appPrice][formControl],[appPrice][formControlName]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => PriceValidatorDirective),
            multi: true,
        },
    ],
})
export class PriceValidatorDirective implements Validator {
    validate(control: AbstractControl) {
        return priceValidator(control);
    }
}
