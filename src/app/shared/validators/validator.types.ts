import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

export type ValidatorDirectResult = { [key: string]: { valid: boolean } };
export type ValidatorResult = Observable<ValidatorDirectResult> |
    Promise<ValidatorDirectResult> |
    ValidatorDirectResult;
export type ValidatorFunction = (control: AbstractControl) => ValidatorResult;
