/** 导出文章类型 */
interface ArticleLazyReturn {
    default: string;
}

/** @description 基本文章信息 */
export type BaseArticleMeta = Partial<{
    /** @description 文章标题 */
    artTitle: string;
    /** @description 文章摘要 */
    articleAbstract: string;
    /** @description 创建时间 */
    createTime: Date;
    /** @description 最后修改时间 */
    modifyTime: Date;
}>;

/**
 * @description 去掉文件名的前缀'./'与后缀'.md'
 * @param filePath 输入的文件path
 * @returns 纯净的文件名
 */
const pureName = (filePath: string): string =>
    //       移除前缀 './'       &   移除后缀 '.md'
    filePath.replace(/^\.\//, '').replace(/\.md$/, '');

/** @description 引入所有文章 */
export const importAllArticles = () => {
    const articlesCxt = require.context('.', true, /\.md$/i, 'lazy');
    return articlesCxt.keys().reduce(
        (prev, k) => ({
            ...prev,
            [pureName(k)]: articlesCxt(k),
        }),
        {} as Record<string, unknown>
    ) as Record<string, Promise<ArticleLazyReturn>>;
};
