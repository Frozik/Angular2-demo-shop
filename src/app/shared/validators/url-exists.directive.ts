import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, Validator } from '@angular/forms';

import { urlExistsValidator } from './url-exists-validator.function';

@Directive({
    selector: '[appUrlExists][ngModel],[appUrlExists][formControl],[appUrlExists][formControlName]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: forwardRef(() => UrlExistsValidatorDirective),
            multi: true,
        },
    ],
})
export class UrlExistsValidatorDirective implements Validator {
    validate(control: AbstractControl) {
        return urlExistsValidator(control);
    }
}
