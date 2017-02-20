import { AbstractControl } from '@angular/forms';

export function noLeadingTrailingWhitespaceValidator(control: AbstractControl) {
    const valid = !/(^\s+)|(\s+$)/.test(control.value);

    return valid ? null : { noLeadingTrailingWhitespace: { valid } };
}
