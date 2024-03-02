import { cloneDeep } from 'lodash';

type Key = string | number | symbol;

/**
 * @description copy object but exclude some keys
 * @param obj object to be copied
 * @param excludedKeys keys to be excluded
 * @param opts other options for this func
 * @returns copied object
 */
export const copyExcludeKeys = <Obj extends object, Keys extends readonly Key[] = readonly (keyof Obj)[]>(
    obj: Obj,
    excludedKeys: Keys,
    opts: Partial<{
        /** @description is cloning deeply */
        isDeep: boolean;
        /** @description A deep copy function. The `_.cloneDeep` (lodash) is taken by default. You can realise it by yourself. */
        deepCopyAdapter<T>(v: T): T;
    }> = {}
): Omit<Obj, Keys[number]> => {
    const { isDeep = false, deepCopyAdapter = cloneDeep } = opts || {};

    // the shallow copy result
    const rawRes = Object.keys(obj).reduce((prev, key) => {
        if (excludedKeys.includes(key)) {
            return prev;
        }

        return {
            ...prev,
            [key]: obj[key as keyof typeof obj],
        };
    }, {} as Omit<Obj, Keys[number]>);

    // for deep clone
    if (isDeep) {
        return deepCopyAdapter(rawRes);
    }

    return rawRes;
};
