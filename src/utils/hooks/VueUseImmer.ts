import { shallowRef, shallowReadonly, type ShallowRef } from 'vue';
import { produce, freeze as immerFreeze } from 'immer';

type Updater<T> = (draft: T) => void;

/**
 * @description use-immer vue version
 * @param v value
 */
export function useImmerVue<T = unknown>(v: T) {
    const shallowRefValue = shallowRef(immerFreeze(v, true));

    function setter(updater: Updater<T> | T) {
        if (typeof updater === 'function') {
            shallowRefValue.value = produce(shallowRefValue.value, updater as Updater<T>);
        } else {
            shallowRefValue.value = immerFreeze(updater, true);
        }
    }

    return [shallowReadonly(shallowRefValue) as Readonly<ShallowRef<T>>, setter] as const;
}
