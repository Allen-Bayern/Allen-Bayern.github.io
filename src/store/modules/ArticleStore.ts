import { defineStore } from 'pinia';
import { importAllArticles, type ArticleLazyReturn } from '@/articles';

// 引入文章集
const allArticles = importAllArticles<ArticleLazyReturn>();

/** @description 获取文章的store */
const useArticleStore = defineStore('articleStore', {
    state() {
        return {
            // 当前article id
            currentArticleId: '',
            // 当前article
            currentArticle: '',
        };
    },
    actions: {
        async getArticle(articleId: string) {
            if (Object.keys(allArticles).includes(articleId)) {
                this.currentArticleId = articleId;
                // 懒加载文章
                const articleCnt = await allArticles[articleId];
                this.currentArticle = articleCnt?.default;
            }
        },
    },
});

/** @description 文章store */
export default useArticleStore;
