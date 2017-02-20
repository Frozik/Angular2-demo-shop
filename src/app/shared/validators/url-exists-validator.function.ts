import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

export function urlExistsValidator(control: AbstractControl) {
    const url = control.value;

    return new Observable((observer) => {
        const image = new Image();

        image.onload = () => {
            observer.next(null);
            observer.complete();
        };
        image.onerror = () => {
            observer.next({ urlExists: { valid: false } });
            observer.complete();
        };

        image.src = url;
    });
}
