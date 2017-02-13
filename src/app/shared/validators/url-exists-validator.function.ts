import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

export function urlExistsValidator(control: AbstractControl) {
    const url = control.value;

    return new Observable((observer) => {
        const img = new Image();

        img.onload = () => {
            observer.next(null);
            observer.complete();
        };
        img.onerror = () => {
            observer.next({ urlExists: { valid: false } });
            observer.complete();
        };

        img.src = url;
    });
}
