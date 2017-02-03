import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'number' })
export class NumberPipe implements PipeTransform {
    transform(value: string) {
        return value === '' ? null : parseInt(value, 10);
    }
}
