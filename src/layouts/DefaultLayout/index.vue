<script lang="ts" setup>
import { computed } from 'vue';
import { maxMobileWidth, useScreenWidth } from '@/utils';

// screen width变化逻辑
const screenWidth = useScreenWidth();

// 是否为PC
const isPc = computed(() => screenWidth.value > maxMobileWidth);
</script>

<template>
    <div class="default-layout">
        <!-- Header part -->
        <header class="default-layout-header">
            <h1 class="my-blog">欢迎光临我的博客</h1>
        </header>

        <!-- Main part -->
        <main class="default-layout-main">
            <div
                class="default-layout-main-left"
                v-if="isPc"
            ></div>
            <div class="default-layout-main-part">
                <router-view />
            </div>
            <div
                class="default-layout-main-right"
                v-if="isPc"
            ></div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.default-layout {
    width: 100vw;
    overflow: hidden;
    display: flex;
    flex-flow: column;
    align-items: center;

    &-header,
    &-main {
        width: 100%;
        display: flex;
    }

    &-main {
        &-left,
        &-right {
            width: 20vw;
        }

        &-part {
            flex: 1;
            overflow-x: hidden;
            overflow-y: auto;
        }
    }
}
</style>
