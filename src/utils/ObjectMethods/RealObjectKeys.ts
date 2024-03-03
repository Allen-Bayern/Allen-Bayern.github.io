/**
 * @description A method to replace `Object.keys` because the `Object.keys` can only get all string keys without symbol ones.
 * @param obj Any object that can be taken as the parameter of `Object.getOwnPropertyNames` and `Object.getOwnPropertySymbols`
 * @returns All keys of the object
 */
export const objectAllEnumerableKeys = <T extends object>(obj: T) =>
    [...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)]
        .map(k => {
            const desc = Object.getOwnPropertyDescriptor(obj, k);
            if (desc && desc.enumerable) return k;
            return null;
        })
        .filter(k => ['string', 'number', 'symbol'].includes(typeof k)) as (keyof T)[];
