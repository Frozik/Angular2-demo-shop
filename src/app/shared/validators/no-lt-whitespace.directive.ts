import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

import { noLeadingTrailingWhitespaceValidator } from './no-lt-whitespace.function';

@Directive({
    selector: '[appNoLTWhitespace][ngModel],[appNoLTWhitespace][formControl],[appNoLTWhitespace][formControlName]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => NoLeadingTrailingWhitespaceValidatorDirective),
            multi: true,
        },
    ],
})
export class NoLeadingTrailingWhitespaceValidatorDirective implements Validator {
    validate(control: AbstractControl) {
        return noLeadingTrailingWhitespaceValidator(control);
    }
}
