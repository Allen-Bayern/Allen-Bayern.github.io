<script lang="ts" setup>
import { maxMobileWidth, useScreenWidth } from '@/utils';

// screen width变化逻辑
const screenWidth = useScreenWidth();
</script>

<template>
    <div class="default-layout">
        <div
            class="default-layout-left"
            v-if="screenWidth > maxMobileWidth"
        ></div>
        <main class="default-layout-main">
            <router-view />
        </main>
        <div
            class="default-layout-right"
            v-if="screenWidth > maxMobileWidth"
        ></div>
    </div>
</template>

<style lang="scss" scoped>
.default-layout {
    width: 100vw;
    overflow: hidden;
    display: flex;

    &-left,
    &-right {
        width: 25%;
    }

    &-main {
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
    }
}
</style>
