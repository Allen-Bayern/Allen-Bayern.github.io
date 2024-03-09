import { useRouter } from 'vue-router';

/** @description 跳转404页面通用方法 */
export const toNotFound = () => {
    useRouter().push('/404');
};

/** @description 无意义的空函数, 一般用作占位 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function pass() {}
