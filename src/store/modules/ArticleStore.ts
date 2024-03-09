import { defineStore } from 'pinia';
import { importAllArticles, type ArticleLazyReturn } from '@/articles';
import { toNotFound } from '@/utils';

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
            try {
                if (articleId !== this.currentArticleId) {
                    const allArticles = importAllArticles<ArticleLazyReturn>();
                    const allArticlesTitleList = Object.keys(allArticles);

                    // 仅在有文章的时候加载
                    if (allArticlesTitleList.includes(articleId)) {
                        this.currentArticleId = articleId;
                        // 懒加载文章
                        const articleCnt = await allArticles[articleId];
                        this.currentArticle = articleCnt.default;
                    } else {
                        toNotFound();
                    }
                }
            } catch {
                // 如没有, 导航到404页面
                toNotFound();
            }
        },
    },
});

/** @description 文章store */
export default useArticleStore;
