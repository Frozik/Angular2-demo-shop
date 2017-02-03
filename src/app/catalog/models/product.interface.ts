import { Gender } from './';

export interface IProduct {
    readonly id: number;
    readonly categoryId: number;
    readonly image: string;
    readonly name: string;
    readonly description: string;
    readonly cost: number;
    readonly rating: number;
    readonly gender: Gender;
    readonly count: number;
    readonly soldCount: number;
}
