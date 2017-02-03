export function isDeepEqual(first, second) {
    if (first === second) {
        return true;
    }

    if (!(first instanceof Object) || !(second instanceof Object)) {
        return false;
    }

    if (first.constructor !== second.constructor) {
        return false;
    }

    for (const propertyName in first) {
        if (!first.hasOwnProperty(propertyName)) {
            continue;
        }

        if (!second.hasOwnProperty(propertyName)) {
            return false;
        }

        if (first[propertyName] === second[propertyName]) {
            continue;
        }

        if (typeof(first[propertyName]) !== 'object') {
            return false;
        }

        if (!isDeepEqual(first[propertyName], second[propertyName])) {
            return false;
        }
    }

    for (const propertyName in second) {
        if (second.hasOwnProperty(propertyName) && !first.hasOwnProperty(propertyName)) {
            return false;
        }
    }

    return true;
}
