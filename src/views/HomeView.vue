<script setup lang="ts">
import { onMounted } from 'vue';
import { renderMarkdown } from '@/utils';
import { importAllArticles } from '@/articles';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
    console.log(route.query);
    console.log(
        importAllArticles().HelloWorld.then(res => {
            const md = renderMarkdown(res.default);
            console.log(md);
        })
    );
});
</script>

<template>
    <div>hello world</div>
</template>

<style scoped lang="scss"></style>
