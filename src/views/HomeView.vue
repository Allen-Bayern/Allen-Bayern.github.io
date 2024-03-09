<script setup lang="ts">
import { onMounted } from 'vue';
import { renderMarkdown } from '@/utils';
import { importAllArticles } from '@/articles';
import yaml from 'js-yaml';

const onParseFrontMeta = (metaStr: string) => {
    const res = yaml.load(metaStr);
    console.log(res);
};

onMounted(() => {
    console.log(
        importAllArticles().HelloWorld.then(res => {
            const md = renderMarkdown(res.default, { onParseFrontMeta });
            console.log(md);
        })
    );
});
</script>

<template>
    <div>hello world</div>
</template>

<style scoped lang="scss"></style>
