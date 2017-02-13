import { AbstractControl, ValidatorFn } from '@angular/forms';

export function numberRangeValidator(minValue: number, maxValue: number): ValidatorFn {
    return (control: AbstractControl) => {
        const parsedNumber = parseFloat(control.value);

        const valid = !isNaN(parsedNumber) && isFinite(parsedNumber) &&
            Number.isInteger(parsedNumber)  &&
            parsedNumber >= minValue && parsedNumber <= maxValue;

        return valid ? null : { numberRange: { valid } };
    };
}
