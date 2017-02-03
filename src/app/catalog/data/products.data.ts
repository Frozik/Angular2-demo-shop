// Images are taken from https://www.pexels.com/search/fashion/
// CC0 License
//
// ✓ Free for personal and commercial use
// ✓ No attribution required

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { Observable } from 'rxjs/Observable';

import { Gender, IProduct, IProductFilter } from './../models';

const sourceProducts = [
    {
        id: 0,
        categoryId: 0,
        image: 'https://images.pexels.com/photos/179909/pexels-photo-179909.jpeg?h=350&auto=compress&cs=tinysrgb',
        name: 'Active wear Lorem Ipsum 1',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed libero enim, sollicitudin a elit vel, dapibus pellentesque nunc.
Phasellus ac rutrum massa.
Vivamus non nulla lobortis augue ullamcorper congue.`,
        cost: 47.78,
        rating: 4,
        gender: Gender.Man,
        count: 50,
        soldCount: 50,
    },
    {
        id: 1,
        categoryId: 0,
        image: 'https://images.pexels.com/photos/285171/pexels-photo-285171.jpeg?h=350&auto=compress&cs=tinysrgb',
        name: 'Active wear Lorem Ipsum 2',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed libero enim, sollicitudin a elit vel, dapibus pellentesque nunc.
Phasellus ac rutrum massa.
Vivamus non nulla lobortis augue ullamcorper congue.`,
        cost: 53.99,
        rating: 3,
        gender: Gender.Man,
        count: 10,
        soldCount: 0,
    },
    {
        id: 2,
        categoryId: 0,
        image: 'https://images.pexels.com/photos/26549/pexels-photo-26549.jpg?h=350&auto=compress&cs=tinysrgb',
        name: 'Active wear Lorem Ipsum 3',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        cost: 41.49,
        rating: 5,
        gender: Gender.Unisex,
        count: 20,
        soldCount: 0,
    },
    {
        id: 3,
        categoryId: 0,
        image: 'https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?h=350&auto=compress&cs=tinysrgb',
        name: 'Active wear Lorem Ipsum 4',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        cost: 37.99,
        rating: 0,
        gender: Gender.Woman,
        count: 5,
        soldCount: 0,
    },
    {
        id: 4,
        categoryId: 0,
        image: 'https://images.pexels.com/photos/47401/pexels-photo-47401.jpeg?h=350&auto=compress&cs=tinysrgb',
        name: 'Active wear Lorem Ipsum 5',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        cost: 24.99,
        rating: 2,
        gender: Gender.Woman,
        count: 0,
        soldCount: 0,
    },
    {
        id: 10,
        categoryId: 1,
        image: 'https://images.pexels.com/photos/25641/pexels-photo-25641.jpg?h=350&auto=compress&cs=tinysrgb',
        name: 'Jeans Lorem Ipsum 1',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed libero enim, sollicitudin a elit vel, dapibus pellentesque nunc.
Phasellus ac rutrum massa.
Vivamus non nulla lobortis augue ullamcorper congue.`,
        cost: 117.99,
        rating: 4,
        gender: Gender.Man,
        count: 10,
        soldCount: 0,
    },
    {
        id: 11,
        categoryId: 1,
        image: 'https://images.pexels.com/photos/198747/pexels-photo-198747.jpeg?h=350&auto=compress&cs=tinysrgb',
        name: 'Jeans Lorem Ipsum 2',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed libero enim, sollicitudin a elit vel, dapibus pellentesque nunc.
Phasellus ac rutrum massa.
Vivamus non nulla lobortis augue ullamcorper congue.`,
        cost: 137.99,
        rating: 5,
        gender: Gender.Man,
        count: 5,
        soldCount: 0,
    },
    {
        id: 12,
        categoryId: 1,
        image: 'https://images.pexels.com/photos/60228/pexels-photo-60228.jpeg?h=350&auto=compress&cs=tinysrgb',
        name: 'Jeans Lorem Ipsum 3',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        cost: 357.99,
        rating: 2,
        gender: Gender.Unisex,
        count: 30,
        soldCount: 0,
    },
    {
        id: 13,
        categoryId: 1,
        image: 'https://images.pexels.com/photos/92961/pexels-photo-92961.jpeg?h=350&auto=compress&cs=tinysrgb',
        name: 'Jeans Lorem Ipsum 4',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        cost: 277.99,
        rating: 3,
        gender: Gender.Woman,
        count: 10,
        soldCount: 0,
    },
    {
        id: 14,
        categoryId: 1,
        image: 'https://images.pexels.com/photos/24155/pexels-photo.jpg?h=350&auto=compress&cs=tinysrgb',
        name: 'Jeans Lorem Ipsum 5',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        cost: 752.99,
        rating: 5,
        gender: Gender.Woman,
        count: 10,
        soldCount: 0,
    },
    {
        id: 20,
        categoryId: 2,
        image: 'https://images.pexels.com/photos/24156/pexels-photo-24156.jpg?h=350&auto=compress&cs=tinysrgb',
        name: 'Coats Lorem Ipsum 1',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed libero enim, sollicitudin a elit vel, dapibus pellentesque nunc.
Phasellus ac rutrum massa.
Vivamus non nulla lobortis augue ullamcorper congue.`,
        cost: 523.99,
        rating: 2,
        gender: Gender.Man,
        count: 5,
        soldCount: 0,
    },
    {
        id: 21,
        categoryId: 2,
        image: 'https://images.pexels.com/photos/94731/pexels-photo-94731.jpeg?h=350&auto=compress&cs=tinysrgb',
        name: 'Coats Lorem Ipsum 2',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed libero enim, sollicitudin a elit vel, dapibus pellentesque nunc.
Phasellus ac rutrum massa.
Vivamus non nulla lobortis augue ullamcorper congue.`,
        cost: 409.99,
        rating: 1,
        gender: Gender.Man,
        count: 20,
        soldCount: 0,
    },
    {
        id: 22,
        categoryId: 2,
        image: 'https://images.pexels.com/photos/27696/pexels-photo-27696.jpg?h=350&auto=compress&cs=tinysrgb',
        name: 'Coats Lorem Ipsum 3',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        cost: 456.99,
        rating: 1,
        gender: Gender.Unisex,
        count: 30,
        soldCount: 0,
    },
    {
        id: 23,
        categoryId: 2,
        image: 'https://images.pexels.com/photos/24257/pexels-photo-24257.jpg?h=350&auto=compress&cs=tinysrgb',
        name: 'Coats Lorem Ipsum 4',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        cost: 672.99,
        rating: 3,
        gender: Gender.Woman,
        count: 10,
        soldCount: 0,
    },
    {
        id: 24,
        categoryId: 2,
        image: 'https://images.pexels.com/photos/26067/pexels-photo-26067.jpg?h=350&auto=compress&cs=tinysrgb',
        name: 'Coats Lorem Ipsum 5',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        cost: 852.99,
        rating: 4,
        gender: Gender.Woman,
        count: 5,
        soldCount: 0,
    },
    {
        id: 30,
        categoryId: 3,
        image: 'https://images.pexels.com/photos/94777/pexels-photo-94777.jpeg?h=350&auto=compress&cs=tinysrgb',
        name: 'Sweaters Lorem Ipsum 1',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed libero enim, sollicitudin a elit vel, dapibus pellentesque nunc.
Phasellus ac rutrum massa.
Vivamus non nulla lobortis augue ullamcorper congue.`,
        cost: 62.99,
        rating: 2,
        gender: Gender.Man,
        count: 10,
        soldCount: 0,
    },
    {
        id: 31,
        categoryId: 3,
        image: 'https://images.pexels.com/photos/4156/fashion-woman-model-portrait.jpg?h=350&auto=compress&cs=tinysrgb',
        name: 'Sweaters Lorem Ipsum 2',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed libero enim, sollicitudin a elit vel, dapibus pellentesque nunc.
Phasellus ac rutrum massa.
Vivamus non nulla lobortis augue ullamcorper congue.`,
        cost: 92.99,
        rating: 3,
        gender: Gender.Man,
        count: 30,
        soldCount: 0,
    },
    {
        id: 32,
        categoryId: 3,
        image: 'https://images.pexels.com/photos/167890/pexels-photo-167890.jpeg?h=350&auto=compress&cs=tinysrgb',
        name: 'Sweaters Lorem Ipsum 3',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        cost: 97.99,
        rating: 5,
        gender: Gender.Unisex,
        count: 5,
        soldCount: 0,
    },
    {
        id: 33,
        categoryId: 3,
        image: 'https://images.pexels.com/photos/157888/fashion-glasses-go-pro-female-157888.jpeg?h=350&auto=compress&cs=tinysrgb',
        name: 'Sweaters Lorem Ipsum 4',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        cost: 28.99,
        rating: 4,
        gender: Gender.Woman,
        count: 10,
        soldCount: 0,
    },
    {
        id: 34,
        categoryId: 3,
        image: 'https://images.pexels.com/photos/63953/pexels-photo-63953.jpeg?h=350&auto=compress&cs=tinysrgb',
        name: 'Sweaters Lorem Ipsum 5',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        cost: 512.99,
        rating: 0,
        gender: Gender.Woman,
        count: 10,
        soldCount: 0,
    },
    {
        id: 40,
        categoryId: 4,
        image: 'https://images.pexels.com/photos/169729/pexels-photo-169729.jpeg?h=350&auto=compress&cs=tinysrgb',
        name: 'Wear to work Lorem Ipsum 1',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed libero enim, sollicitudin a elit vel, dapibus pellentesque nunc.
Phasellus ac rutrum massa.
Vivamus non nulla lobortis augue ullamcorper congue.`,
        cost: 89.99,
        rating: 3,
        gender: Gender.Man,
        count: 5,
        soldCount: 0,
    },
    {
        id: 41,
        categoryId: 4,
        image: 'https://images.pexels.com/photos/216983/pexels-photo-216983.jpeg?h=350&auto=compress&cs=tinysrgb',
        name: 'Wear to work Lorem Ipsum 2',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed libero enim, sollicitudin a elit vel, dapibus pellentesque nunc.
Phasellus ac rutrum massa.
Vivamus non nulla lobortis augue ullamcorper congue.`,
        cost: 261.99,
        rating: 2,
        gender: Gender.Man,
        count: 10,
        soldCount: 10,
    },
    {
        id: 42,
        categoryId: 4,
        image: 'https://images.pexels.com/photos/93488/pexels-photo-93488.jpeg?h=350&auto=compress&cs=tinysrgb',
        name: 'Wear to work Lorem Ipsum 3',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        cost: 866.99,
        rating: 0,
        gender: Gender.Unisex,
        count: 10,
        soldCount: 0,
    },
    {
        id: 43,
        categoryId: 4,
        image: 'https://images.pexels.com/photos/24272/pexels-photo-24272.jpg?h=350&auto=compress&cs=tinysrgb',
        name: 'Wear to work Lorem Ipsum 4',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        cost: 173.99,
        rating: 5,
        gender: Gender.Woman,
        count: 5,
        soldCount: 0,
    },
    {
        id: 44,
        categoryId: 4,
        image: 'https://images.pexels.com/photos/108061/pexels-photo-108061.jpeg?h=350&auto=compress&cs=tinysrgb',
        name: 'Wear to work Lorem Ipsum 5',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        cost: 527.99,
        rating: 4,
        gender: Gender.Woman,
        count: 5,
        soldCount: 0,
    },
];

export function getStorageProducts(): IProduct[] {
    return JSON.parse(localStorage.getItem('products-list-storage'));
}

function setStorageProducts(products: IProduct[]) {
    localStorage.setItem('products-list-storage', JSON.stringify(products));
}

function setStorageProduct(product: IProduct) {
    if (!product) {
        return;
    }

    const products = getStorageProducts().
        filter((innerProduct) => innerProduct.id !== product.id).
        concat([ product ]).
        sort((first, second) => first.id - second.id);

    setStorageProducts(products);
}

const localStorageProducts = getStorageProducts();

if (!localStorageProducts) {
    setStorageProducts(sourceProducts);
}

export function fetchProducts(
    filter: IProductFilter,
    pageNumber: number,
    itemsPerPage: number,
): Observable<IProduct[]> {
    const availabilityFilter = (product: IProduct) => product.count > product.soldCount;
    const genderFilter = (product: IProduct) => product.gender === filter.gender;
    const categoryFilter = (product: IProduct) => product.categoryId === filter.categoryId;
    const ratingFilter = (product: IProduct) => product.rating >= filter.rating.min &&
        product.rating <= filter.rating.max;
    const priceFilter = (product: IProduct) => product.cost >= filter.price.min &&
        product.cost <= filter.price.max;
    const words = (filter.text || '').
        split(/[\s\+\-*\/~!@#$%^&*()\[\]{}"№%:,.;_|<>]+/).
        filter((word) => !!word).
        map((word) => word.toUpperCase());
    const textFilter = (product: IProduct) => words.every((word) =>
        product.name.toUpperCase().includes(word) || product.description.toUpperCase().includes(word),
    );

    const productFilters = [];

    if (filter.gender !== null) {
        productFilters.push(genderFilter);
    }
    if (filter.categoryId !== null) {
        productFilters.push(categoryFilter);
    }
    if (filter.availableOnly) {
        productFilters.push(availabilityFilter);
    }
    productFilters.push(ratingFilter);
    productFilters.push(priceFilter);
    if (words.length) {
        productFilters.push(textFilter);
    }

    const productFilter = (product) => productFilters.every((propertyFilter) => propertyFilter(product));

    const productsPage = getStorageProducts().
        filter(productFilter).
        slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage);

    return Observable.of(productsPage).delay(2000);
}

export function fetchProduct(productId: number): Observable<IProduct> {
    const productFilter = (product) => product.id === productId;

    return Observable.of(getStorageProducts().find(productFilter) || null).delay(1000);
}

export function sellProduct(productId: number): Observable<boolean> {
    const product = getStorageProducts().find((innerProduct) => innerProduct.id === productId);

    if (!product) {
        return Observable.of(false);
    }

    if (product.soldCount >= product.count) {
        return Observable.of(false).delay(1000);
    }

    setStorageProduct(Object.assign({ }, product, { soldCount: product.soldCount + 1 }));

    return Observable.of(true).delay(2000);
}

export function addProducts(productId: number, count: number) {
    const product = getStorageProducts().find((innerProduct) => innerProduct.id === productId);

    setStorageProduct(Object.assign({ }, product, { count: product.count + count }));
}

export function updateProductDetails(
    productId: number,
    updateData: {
        image?: string,
        name?: string,
        description?: string,
        cost?: number,
        rating?: number,
    },
) {
    const product = getStorageProducts().find((innerProduct) => innerProduct.id === productId);

    setStorageProduct(Object.assign({ }, product, updateData));
}

export function deleteProduct(productId: number) {
    const products = getStorageProducts().filter((innerProduct) => innerProduct.id !== productId);

    setStorageProducts(products);
}

export function getSoldByCategory(): Observable<Array<{ count: number, categoryId: number }>> {
    const result = getStorageProducts().reduce(
        (
            accumulator: Array<{ count: number, categoryId: number }>,
            product: IProduct,
        ): Array<{ count: number, categoryId: number }> => {
            const item = accumulator.
                find((statistic) => statistic.categoryId === product.categoryId);
            const array = accumulator.filter((statistic) => statistic !== item);

            return array.concat([{
                categoryId: product.categoryId,
                count: (item ? item.count : 0) + product.soldCount,
            }]);
        },
        [],
    );

    return Observable.of(result).delay(3000);
}


export function getSoldPriceByCategory(): Observable<Array<{ sold: number, categoryId: number }>> {
    const result = getStorageProducts().reduce(
        (
            accumulator: Array<{ sold: number, categoryId: number }>,
            product: IProduct,
        ): Array<{ sold: number, categoryId: number }> => {
            const item = accumulator.
                find((statistic) => statistic.categoryId === product.categoryId);
            const array = accumulator.filter((statistic) => statistic !== item);
            const sold = (item ? item.sold : 0) + product.cost * product.soldCount;

            return array.concat([{
                categoryId: product.categoryId,
                sold: Math.round(sold * 100) / 100,
            }]);
        },
        [],
    );

    return Observable.of(result).delay(1000);
}
