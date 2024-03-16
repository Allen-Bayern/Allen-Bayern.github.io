<script setup lang="ts">
import { shallowRef, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import strFormat from 'string-format';
import yaml from 'js-yaml';
import moment from 'moment';
import { importAllArticles, type BaseArticleMeta } from '@/articles';
import { YMD } from '@/utils';

const router = useRouter();

/** @description 文章列表 */
const articleList = shallowRef<
    {
        artKey: string;
        latestTime: string;
        articleTitle: string;
        articleAbstract: string;
    }[]
>([]);

/** @description 处理文章函数 */
async function processAllArticles() {
    // regular expressions
    const metaPattern = /^---\n([\s\S]*?)\n---/;
    const h1Pattern = /^# (.+)$/m;
    const metaStrTemplate = '---\n{}\n---\n\n';

    const allArts = importAllArticles();

    const res: {
        artKey: string;
        latestTime: string;
        articleTitle: string;
        articleAbstract: string;
    }[] = [];

    Object.keys(allArts).forEach(async (k, i) => {
        const val = await allArts[k as keyof typeof allArts];

        const { default: markdownText } = val;

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

        // 文章摘要, 如无则取前100字
        const articleAbstract = (artAbstract ?? restContent ?? '').trim().substring(0, 100);

        res.push({
            artKey: k,
            latestTime: moment(latestTimeNum).format(YMD),
            articleTitle,
            articleAbstract,
        });

        if (i === Object.keys(allArts).length - 1) {
            // 添加完毕后设置value
            articleList.value = res.sort((prevValue, nextValue) => {
                const { latestTime: prevLatest } = prevValue;
                const { latestTime: nextLatest } = nextValue;

                return moment(prevLatest).valueOf() - moment(nextLatest).valueOf();
            });
        }
    });
}

/** @description 路由跳转函数 */
function toArticle(article: string) {
    router.push({
        name: 'article',
        query: {
            article,
        },
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
            v-for="(item, index) in articleList"
            :key="item.articleTitle"
            class="home-art"
            @click="toArticle(item.artKey)"
        >
            <h1 :class="['home-art-title', 'home-art-card', index >= 2 ? 'more-than-two' : '']">
                {{ item.articleTitle }}
            </h1>
            <p class="home-art-time home-art-card">{{ item.latestTime }}</p>
            <p class="home-art-abs home-art-card">{{ item.articleAbstract }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home {
    &-art {
        display: flex;
        flex-flow: column;
        justify-content: center;

        &:hover {
            cursor: pointer;
        }

        &-card {
            margin-bottom: 8px;
            font-size: 16px;
        }

        &-title {
            font-size: 28px;
            color: #f4669e;
        }

        .more-than-two {
            color: #b54a99;
        }

        &-time {
            font-size: 12px;
        }

        @include for-phone-only {
            &-card {
                margin-bottom: 8vpx;
                font-size: 16vpx;
            }

            &-title {
                font-size: 28vpx;
            }

            &-time {
                font-size: 12vpx;
            }
        }
    }
}
</style>
