<script lang="ts" setup>
import { VueMarkdown } from '@/components';
import firstArticle from './FirstArticle.md';
</script>

<template>
    <div class="home">
        <vue-markdown :md-string="firstArticle" />
    </div>
</template>

<style lang="scss" scoped>
.home {
    font-size: 24vpx;
}
</style>
