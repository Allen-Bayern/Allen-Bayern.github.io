<script lang="ts" setup>
// Vue 解析 markdown 组件
import { ref, watchEffect, onUnmounted } from 'vue';
import { renderMarkdown, renderMarkdownAsync } from '@/utils/ParseMarkdown';

// --- props ---
const props = withDefaults(
    defineProps<{
        mdString: string;
        isAsync?: boolean;
    }>(),
    {
        isAsync() {
            return true;
        },
    }
);

// ref dom
const domRef = ref<HTMLDivElement | null>(null);

// to set HTML
const stopMdEffect = watchEffect(
    () => {
        // watchEffect中可以安全解构props
        const { mdString, isAsync } = props;
        if (isAsync) {
            renderMarkdownAsync(mdString).then(res => {
                if (domRef.value) {
                    domRef.value.innerHTML = res;
                }
            });
        } else {
            if (domRef.value) {
                domRef.value.innerHTML = renderMarkdown(mdString);
            }
        }
    },
    {
        flush: 'post',
    }
);

// clear watcher
onUnmounted(() => {
    stopMdEffect();
});
</script>

<template>
    <div
        class="vue-markdown"
        ref="domRef"
    />
</template>

<!-- ATTENTION: 这里不要用scoped -->
<style lang="scss">
.vue-markdown {
    background: inherit;
    font-size: 16px;
    overflow-x: hidden;
    overflow-y: auto;

    h1 {
        font-size: 24px;
    }

    h2 {
        font-size: 20px;
    }

    h3 {
        font-size: 18px;
    }

    h4 {
        font-size: 16px;
    }

    h5 {
        font-size: 14px;
    }

    h6 {
        font-size: 12px;
    }

    /** 手机屏幕 */
    @media screen and (min-width: $width-small) and (max-width: $width-medium) {
        /* 在这里编写样式, 例如：调整字体大小、布局等 */
        font-size: 16vpx;

        h1 {
            font-size: 24vpx;
        }

        h2 {
            font-size: 20vpx;
        }

        h3 {
            font-size: 18vpx;
        }

        h4 {
            font-size: 16vpx;
        }

        h5 {
            font-size: 14vpx;
        }

        h6 {
            font-size: 12vpx;
        }
    }
}
</style>
