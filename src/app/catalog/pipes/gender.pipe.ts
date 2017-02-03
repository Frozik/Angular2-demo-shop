import { Pipe, PipeTransform } from '@angular/core';

import { Gender } from './../models';

@Pipe({ name: 'gender' })
export class GenderPipe implements PipeTransform {
    transform(gender: Gender): string {
        switch (gender) {
            case Gender.Man:
                return 'Man';

            case Gender.Woman:
                return 'Woman';

            case Gender.Unisex:
                return 'Unisex';

            default:
                return `None`;

        }
    }
}
