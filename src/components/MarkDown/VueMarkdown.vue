<script lang="ts" setup>
// Vue 解析 markdown 组件
import { ref, watchEffect, onUnmounted } from 'vue';
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

// ref dom
const domRef = ref<HTMLDivElement | null>(null);

// to set HTML
const stopMdEffect = watchEffect(
    () => {
        // watchEffect中可以安全解构props
        const { mdString, isAsync } = props;
        if (isAsync) {
            parseMarkdownAsync(mdString).then(res => {
                if (domRef.value) {
                    domRef.value.innerHTML = res;
                }
            });
        } else {
            if (domRef.value) {
                domRef.value.innerHTML = parseMarkdownSync(mdString);
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
@import './style';
</style>
