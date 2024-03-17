<script lang="ts" setup>
import { watch, watchEffect, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { VueMarkdown } from '@/components';
import { storeToRefs } from 'pinia';
import { useArticleStore } from '@/store/modules';

// constants
const flush = 'post';
const route = useRoute();
const router = useRouter();

// 处理store逻辑
const articleStore = useArticleStore();
const { currentArticle, currentArticleId } = storeToRefs(articleStore);
const { getArticle } = articleStore;

// 解构query
const { query: routeQuery } = route;

// 获取文章主逻辑
const stopParseQuery = watchEffect(
    () => {
        /** @description 以 ?article=xxx 为解析参数 */
        const { article } = routeQuery;
        currentArticleId.value = typeof article === 'string' ? article : '';
    },
    { flush }
);

// 获取article
const stopGetArticle = watch(
    () => currentArticleId.value,
    newValue => {
        getArticle(newValue).catch(() => {
            router.push('/404');
        });
    },
    { flush }
);

onUnmounted(() => {
    stopParseQuery();
    stopGetArticle();
});
</script>

<template>
    <vue-markdown
        class="article-view"
        :md-string="currentArticle"
        :is-async="false"
    />
</template>

<style lang="scss" scoped>
.article-view {
    overflow-y: auto;
}
</style>
