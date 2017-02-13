import { AbstractControl } from '@angular/forms';

export function priceValidator(control: AbstractControl) {
    const parsedNumber = parseFloat(control.value);

    const valid = !isNaN(parsedNumber) && isFinite(parsedNumber) &&
        parsedNumber > 0 && /^\d+(\.\d{1,2})?$/.test(control.value);

    return valid ? null : { numberRange: { valid } };
}
