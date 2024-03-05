<script setup lang="ts">
import { onMounted } from 'vue';
import { importAllArticles } from '@/articles';

onMounted(() => {
    console.log(importAllArticles());
});
</script>

<template>
    <div>hello world</div>
</template>

<style scoped lang="scss"></style>
