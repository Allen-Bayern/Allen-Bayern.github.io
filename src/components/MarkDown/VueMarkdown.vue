<script lang="ts" setup>
// Vue 解析 markdown 组件
import { ref, watchEffect, nextTick, onUnmounted } from 'vue';
import { parseMarkdownAsync, parseMarkdownSync } from '@/utils/ParseMarkdown';

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

// HTML value
const mdToHtmlStr = ref('');

// ref dom
const domRef = ref<HTMLDivElement | null>(null);

// to set HTML
const stopMdEffect = watchEffect(
    () => {
        // watchEffect中可以安全解构props
        const { mdString, isAsync } = props;
        if (isAsync) {
            console.log(mdString);
            parseMarkdownAsync(mdString).then(res => {
                mdToHtmlStr.value = res;
            });
        } else {
            mdToHtmlStr.value = parseMarkdownSync(mdString);
        }

        // set HTML
        nextTick().then(() => {
            if (domRef.value) {
                domRef.value.innerHTML = mdToHtmlStr.value;
            }
        });
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

<style lang="scss">
@import './style';
</style>
