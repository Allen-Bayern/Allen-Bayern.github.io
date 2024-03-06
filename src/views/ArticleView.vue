<script lang="ts" setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { VueMarkdown } from '@/components';

import { storeToRefs } from 'pinia';
import { useArticleStore } from '@/store/modules';

// 处理store逻辑
const articleStore = useArticleStore();
const { currentArticle, currentArticleId } = storeToRefs(articleStore);
const { getArticle } = articleStore;

// 解构query
const { query: routeQuery } = useRoute();

// 获取文章主逻辑
/** @description 以 ?article=xxx 为解析参数 */
const { article } = routeQuery;
currentArticleId.value = typeof article === 'string' ? article : '';
watch(
    () => currentArticleId.value,
    newValue => {
        getArticle(newValue);
    },
    { flush: 'post' }
);
</script>

<template>
    <div class="article-view">
        <vue-markdown
            class="article-view-art"
            :md-string="currentArticle"
        />
    </div>
</template>

<style lang="scss" scoped></style>
