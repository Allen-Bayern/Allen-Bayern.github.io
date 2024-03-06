<script setup lang="ts">
import { onMounted } from 'vue';
import { importAllArticles } from '@/articles';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
    console.log(route.query);
    console.log(importAllArticles());
});
</script>

<template>
    <div>hello world</div>
</template>

<style scoped lang="scss"></style>
