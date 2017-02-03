import { Gender } from './';
import { IRange } from './../../shared/models';

export interface IProductFilter {
    readonly availableOnly: boolean;
    readonly gender: Gender;
    readonly categoryId: number;
    readonly rating: IRange;
    readonly price: IRange;
    readonly text: string;
}
