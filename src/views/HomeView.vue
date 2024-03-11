<script setup lang="ts">
import { shallowRef, onBeforeMount } from 'vue';
import strFormat from 'string-format';
import yaml from 'js-yaml';
import moment from 'moment';
import { importAllArticles, type BaseArticleMeta } from '@/articles';
import { YMD } from '@/utils';

/** @description 文章列表 */
const articleList = shallowRef<
    {
        latestTime: string;
        articleTitle: string;
        articleAbstract: string;
    }[]
>([]);

/** @description 处理文章函数 */
function processAllArticles() {
    // regular expressions
    const metaPattern = /^---\n([\s\S]*?)\n---/;
    const h1Pattern = /^# (.+)$/m;
    const metaStrTemplate = '---\n{}\n---\n\n';

    // import all articles
    Promise.all(Object.values(importAllArticles()))
        .then(allArticles => {
            articleList.value = allArticles.map(item => {
                const { default: markdownText } = item;

                // cope with meta
                const metaMatch = markdownText.match(metaPattern);
                const metaInfo = metaMatch ? metaMatch[1] : '';
                const metaDict = yaml.load(metaInfo) as BaseArticleMeta;

                const { createTime, modifyTime, artTitle, articleAbstract: artAbstract } = metaDict;

                // 文章最新修改时间
                let latestTimeNum = +new Date();
                if (createTime && modifyTime) {
                    latestTimeNum = Math.max(+createTime, +modifyTime);
                }

                // cope with content
                const articleCnt = markdownText.replace(strFormat(metaStrTemplate, metaInfo), '');

                // 截取h1部分, 并分离h1与正文
                const h1Match = articleCnt.match(h1Pattern);
                const h1Title = h1Match ? h1Match[1] : '';
                const restContent = articleCnt.replace(`# ${h1Title}`, '');

                // 文章title
                const articleTitle = artTitle ?? h1Title;

                // 文章摘要, 如无则取前120字
                const articleAbstract = (artAbstract ?? restContent ?? '').trim().substring(0, 120);

                return {
                    latestTime: moment(latestTimeNum).format(YMD),
                    articleTitle,
                    articleAbstract,
                };
            });
        })
        .catch(() => {
            console.error('Import all articles failed');
        });
}

onBeforeMount(() => {
    processAllArticles();
});
</script>

<template>
    <div class="home">
        <!-- 文章列表 -->
        <div
            class="home-art"
            v-for="item in articleList"
            :key="item.articleTitle"
        >
            <h2 class="home-art-title">{{ item.articleTitle }}</h2>
            <p class="home-art-abs">{{ item.articleAbstract }}</p>
            <p class="home-art-time">{{ item.latestTime }}</p>
        </div>
    </div>
</template>
