/** 导出文章类型 */
export interface ArticleLazyReturn {
    default: string;
}

/**
 * @description 去掉文件名的前缀'./'与后缀'.md'
 * @param filePath 输入的文件path
 * @returns 纯净的文件名
 */
const pureName = (filePath: string): string =>
    //       移除前缀 './'       &   移除后缀 '.md'
    filePath.replace(/^\.\//, '').replace(/\.md$/, '');

/** @description 引入所有文章 */
export const importAllArticles = <Ret = ArticleLazyReturn>() => {
    const articlesCxt = require.context('.', true, /\.md$/i, 'lazy');
    return articlesCxt.keys().reduce(
        (prev, k) => ({
            ...prev,
            [pureName(k)]: articlesCxt(k),
        }),
        {} as Record<string, unknown>
    ) as Record<string, Promise<Ret>>;
};
