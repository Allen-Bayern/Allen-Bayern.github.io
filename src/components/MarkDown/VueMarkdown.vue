<script lang="ts" setup>
// Vue 解析 markdown 组件
import { ref, watchEffect, watch, onBeforeUnmount, onUnmounted } from 'vue';
import moment from 'moment';
import yaml from 'js-yaml';
import strFormat from 'string-format';
import { BaseArticleMeta } from '@/articles';
import { renderMarkdown, renderMarkdownAsync, useImmerVue as useImmer, globalTitle, YMD } from '@/utils';

// --- props ---
const props = withDefaults(
    defineProps<{
        mdString: string;
        isAsync?: boolean;
        isSetTitle?: boolean;
    }>(),

    // default values
    { isAsync: () => true, isSetTitle: () => true }
);

// --- constants ---
const flush = 'post';

// --- logics ---

// ref dom
const domRef = ref<HTMLDivElement | null>(null);
// html string
const htmlStr = ref('');
const [metaInfo, updateMetaInfo] = useImmer<BaseArticleMeta>({});

/**
 * @description 解析文章meta信息
 * @param metaStr 文章的yml字符串
 */
function onParseFrontMeta(metaStr: string) {
    const res = yaml.load(metaStr) as BaseArticleMeta;
    updateMetaInfo(res);
}

// to get HTML string
const stopMdEffect = watchEffect(
    () => {
        // watchEffect中可以安全解构props
        const { mdString, isAsync } = props;
        if (isAsync) {
            renderMarkdownAsync(mdString, { onParseFrontMeta }).then(res => {
                if (domRef.value) {
                    htmlStr.value = res;
                }
            });
        } else {
            if (domRef.value) {
                htmlStr.value = renderMarkdown(mdString, { onParseFrontMeta });
            }
        }
    },
    { flush }
);

// to set innerHTML
const stopParseHtmlEffect = watch(
    [() => htmlStr.value, () => metaInfo.value, () => props.isSetTitle],
    ([newHtmlStr, newMetaInfo, newSetTitle]) => {
        const { artTitle } = newMetaInfo;

        // parse h1
        const h1Pattern = /<h1>(.*?)<\/h1>/;
        const h1Match = newHtmlStr.match(h1Pattern);
        const h1Content = h1Match ? h1Match[1] : '';

        // rest html
        let realHtmlStr = newHtmlStr.replace(h1Pattern, '');

        // templates
        const oneDomTemp =
            '<div class="meta-info-item"><p class="meta-info-item-p">{}</p><p class="meta-info-item-p">{}</p></div>\n';

        // 处理meta key-value函数
        const metaLabelToValue = (metaDict: BaseArticleMeta, k: keyof BaseArticleMeta): string => {
            if (['createTime', 'modifyTime'].includes(k)) {
                return moment(metaDict[k]).format(YMD);
            }

            return String(metaDict[k]);
        };

        // 仅解析两个日期键
        const metaInfoSelfDom = (['createTime', 'modifyTime'] satisfies (keyof BaseArticleMeta)[]).reduce((prev, k) => {
            let label = '';
            if (k === 'createTime') {
                label = '创建日期:';
            } else if (k === 'modifyTime') {
                label = '最后修改于';
            }

            const oneDom = strFormat(oneDomTemp, label, metaLabelToValue(newMetaInfo, k as keyof typeof newMetaInfo));

            return `${prev}${oneDom}`;
        }, '');

        const metaInfoPart = `<div class="meta-info">${metaInfoSelfDom}</div>`;

        // get result
        realHtmlStr = `<h1 class="the-article-title">${h1Content}</h1>${metaInfoPart}${realHtmlStr}`;

        if (domRef.value) {
            // artTitle的优先级更大一些
            domRef.value.innerHTML = realHtmlStr;
            if (newSetTitle) {
                const newTitle = artTitle || h1Content;
                document.title = newTitle ? `${newTitle}-${globalTitle}` : globalTitle;
            }
        }
    },
    { flush }
);

// fix: before unmount时, 重置标题
onBeforeUnmount(() => {
    document.title = globalTitle;
});

// clear watcher
onUnmounted(() => {
    stopMdEffect();
    stopParseHtmlEffect();
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

    .the-article-title {
        font-weight: 550;
        font-size: 28px;
        margin-bottom: 8px;
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

    p {
        font-size: 16px;
        margin-bottom: 1.5em;
    }

    .meta-info {
        display: flex;
        align-items: center;
        margin-bottom: 32px;

        &-item {
            display: flex;
            margin-right: 1em;

            &-p {
                font-size: 12px;
                margin-right: 0.5em;
                margin-bottom: 0;
            }
        }
    }

    /** 手机屏幕 */
    @include for-phone-only {
        /* 在这里编写样式, 例如：调整字体大小、布局等 */
        font-size: 16vpx;

        .the-article-title {
            font-size: 28vpx;
            margin-bottom: 8vpx;
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

        p {
            font-size: 16vpx;
        }

        .meta-info {
            font-size: 16vpx;
            margin-bottom: 32vpx;

            &-item {
                &-p {
                    font-size: 12vpx;
                }
            }
        }
    }
}
</style>
