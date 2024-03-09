import { shallowRef, shallowReadonly, type ShallowRef } from 'vue';
import { produce, freeze as immerFreeze } from 'immer';

type Updater<T> = (draft: T) => void;

/**
 * @description use-immer vue version
 * @param v value
 */
export function useImmerVue<T = unknown>(v: T) {
    const freezedValue = ['object', 'function'].includes(typeof v) && v !== 'null' ? immerFreeze(v, true) : v;
    const shallowV = shallowRef(freezedValue);

    const setter = (updater: Updater<T> | T) => {
        if (typeof updater === 'function') {
            shallowV.value = produce(shallowV.value, updater as Updater<T>);
        } else {
            shallowV.value = updater;
        }
    };

    return [shallowReadonly(shallowV) as Readonly<ShallowRef<T>>, setter] as const;
}
