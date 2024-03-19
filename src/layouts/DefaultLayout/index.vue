<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

// router
const router = useRouter();

// 标题类名计算
const myBlogClasslist = computed(() => {
    const { name: currentName } = router.currentRoute.value;
    const classList = ['my-blog-title'];

    // 读文章时标题变色
    if (currentName === 'article') {
        if (CSS.supports && CSS.supports('background-clip', 'text')) {
            // 支持`background-clip`时
            classList.push('reading-article');
        } else {
            // 不支持`background-clip`时
            classList.push('reading-article-backup');
        }
    }

    return classList;
});

// 是否显示"关于我"
const isAboutMeShow = computed(() => {
    const { name: currentName } = router.currentRoute.value;
    return currentName !== 'about';
});

// 是否显示"回首页"
const isGoBackShow = computed(() => {
    const { name: currentName } = router.currentRoute.value;
    return currentName !== 'home';
});

// 跳转 "关于我"
function toAboutMe(e: MouseEvent) {
    e.preventDefault();
    router.push({ name: 'about' });
}

// 跳转首页
function toHome(e: MouseEvent) {
    e.preventDefault();
    router.push({ name: 'home' });
}
</script>

<template>
    <div class="default-layout">
        <!-- Header part -->
        <header class="default-layout-header">
            <div class="my-blog">
                <button
                    type="button"
                    :class="myBlogClasslist"
                    @click="toHome"
                >
                    呦，来啦～
                </button>
                <div class="my-blog-btns">
                    <button
                        class="my-blog-btns-btn to-about-me"
                        @click="toAboutMe"
                        v-if="isAboutMeShow"
                    >
                        关于我
                    </button>
                    <button
                        class="my-blog-btns-btn to-home"
                        @click="toHome"
                        v-if="isGoBackShow"
                    >
                        回首页
                    </button>
                </div>
            </div>
        </header>

        <!-- Main part -->
        <main class="default-layout-main">
            <div class="default-layout-main-part">
                <router-view />
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.default-layout {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-flow: column;
    align-items: center;
    background-color: #e2e6f5;
    background-image: url('../../assets/imgs/bg-sand.png');
    background-size: contain;

    &-header,
    &-main {
        width: 100%;
        display: flex;

        @include for-phone-only {
            padding: 8vpx 16vpx;
        }
    }

    &-header {
        margin-top: 24px;
        display: flex;
        align-items: center;
        margin-bottom: 21px;
        margin-top: 48px;

        .my-blog {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;

            &-title {
                font-size: 24px;
                font-weight: 550;
            }

            &-btns {
                font-size: 14px;

                &-btn {
                    color: #d23669;
                    margin-left: 1em;

                    &:first-child {
                        margin-left: 0;
                    }
                }
            }
        }

        .reading-article {
            background-clip: text;
            background-image: linear-gradient(45deg, #f4669e, #712f93);
            color: transparent;
            transition: #f4669e 0.2s ease-out 0s, #712f93 0.2s ease-in-out 0s;
        }

        .reading-article-backup {
            color: #712f93;
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
            margin-top: 24vpx;
            margin-bottom: 0;

            .my-blog {
                &-title {
                    font-size: 24vpx;
                }

                &-btns {
                    font-size: 14vpx;
                }
            }
        }
    }

    &-main {
        overflow-y: auto;

        &::-webkit-scrollbar {
            display: none;
        }

        &-left,
        &-right {
            width: 20vw;
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

        &-part {
            flex: 1;
            overflow-x: hidden;
            overflow-y: auto;
        }
    }
}
</style>
