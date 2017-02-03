import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toFixed' })
export class ToFixedPipe implements PipeTransform {
    transform(value: number, fractionDigits = '2'): string {
        return value.toFixed(parseInt(fractionDigits, 10));
    }
}
