import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';

import { ICategory } from './../models';
import { getStorageProducts } from './products.data';

const sourceCategories: ICategory[] = [
    {
        id: 0,
        name: 'Active wear',
    },
    {
        id: 1,
        name: 'Jeans',
    },
    {
        id: 2,
        name: 'Coats',
    },
    {
        id: 3,
        name: 'Sweaters',
    },
    {
        id: 4,
        name: 'Wear to work',
    },
];

function getStorageCategories(): ICategory[] {
    return JSON.parse(localStorage.getItem('categories-list-storage'));
}

function setStorageCategories(categories: ICategory[]) {
    localStorage.setItem('categories-list-storage', JSON.stringify(categories));
}

function withoutCategory(categoryId: number): ICategory[] {
    return getStorageCategories().filter((innerCategory) => innerCategory.id !== categoryId);
}

function setStorageCategory(category: ICategory) {
    if (!category) {
        return;
    }

    const categories = withoutCategory(category.id).
        concat([ category ]).
        sort((first, second) => first.id - second.id);

    setStorageCategories(categories);
}

const localStorageCategories = getStorageCategories();

if (!localStorageCategories) {
    setStorageCategories(sourceCategories);
}

export function fetchCategories(): Observable<ICategory[]> {
    return Observable.of(getStorageCategories()).delay(2000);
}

export function addCategory(name: string): Observable<boolean> {
    const categories = getStorageCategories();
    const comparableName = name.toUpperCase();

    const result = !categories.some((category) => category.name.toUpperCase() === comparableName);

    if (result) {
        setStorageCategory({
            id: Math.max(...categories.map((category) => category.id)) + 1,
            name,
        });
    }

    return Observable.of(result).delay(2000);
}

export function deleteCategory(categoryId: number): Observable<boolean> {
    const products = getStorageProducts();

    const result = !products.some((product) => product.categoryId === categoryId);

    if (result) {
        setStorageCategories(withoutCategory(categoryId));
    }

    return Observable.of(result).delay(2000);
}
