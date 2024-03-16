<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { maxMobileWidth, useScreenWidth } from '@/utils';

// router
const router = useRouter();

// 标题类名计算
const myBlogClasslist = computed(() => {
    const { name: currentName } = router.currentRoute.value;
    const classList = ['my-blog'];

    // 读文章时标题变色
    if (currentName === 'article') {
        classList.push('reading-article');
    }

    return classList;
});

// screen width变化逻辑
const screenWidth = useScreenWidth();

// 是否为PC
const isPc = computed(() => screenWidth.value > maxMobileWidth);
</script>

<template>
    <div class="default-layout">
        <!-- Header part -->
        <header class="default-layout-header">
            <h1 :class="myBlogClasslist">欢迎光临我的博客</h1>
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

        @include for-phone-only {
            padding: 8vpx 16vpx;
        }
    }

    @include for-phone-only {
        &-header {
            margin-top: 24vpx;
        }
    }

    &-header {
        margin-top: 24px;
        display: flex;
        align-items: center;
        margin-bottom: 24px;
        margin-top: 48px;

        .my-blog {
            flex: 1;
            font-size: 24px;
        }

        .reading-article {
            background-clip: text;
            background-image: linear-gradient(45deg, #f4669e, #712f93);
            color: transparent;
            transition: #f4669e 0.2s ease-out 0s, #712f93 0.2s ease-in-out 0s;
        }

        @include for-pc-only {
            &::before {
                content: '';
                width: 20vw;
            }

            &::after {
                content: '';
                width: 20vw;
            }
        }

        @include for-phone-only {
            margin-bottom: 0;

            .my-blog {
                font-size: 24vpx;
            }
        }
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
