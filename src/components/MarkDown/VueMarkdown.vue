<script lang="ts" setup>
// Vue 解析 markdown 组件
import { ref, watchEffect, watch, onUnmounted } from 'vue';
import moment from 'moment';
import yaml from 'js-yaml';
import strFormat from 'string-format';
import { renderMarkdown, renderMarkdownAsync, useImmerVue as useImmer, globalTitle, YMD } from '@/utils';

// --- props ---
const props = withDefaults(
    defineProps<{
        mdString: string;
        isAsync?: boolean;
    }>(),

    // default values
    { isAsync: () => true }
);

// --- constants ---
const flush = 'post';

// --- types ---
/** @description 基本文章信息 */
interface BaseArticleMeta {
    /** @description 创建时间 */
    createTime?: Date;
    /** @description 最后修改时间 */
    modifyTime?: Date;
}

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
const onParseFrontMeta = (metaStr: string) => {
    const res = yaml.load(metaStr) as BaseArticleMeta;
    updateMetaInfo(res);
};

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
    [() => htmlStr.value, () => metaInfo.value],
    ([newHtmlStr, newMetaInfo]) => {
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

        // parse meta
        const metaInfoSelfDom = Object.keys(newMetaInfo).reduce((prev, k) => {
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
        realHtmlStr = `${h1Content}${metaInfoPart}${realHtmlStr}`;

        if (domRef.value) {
            domRef.value.innerHTML = realHtmlStr;
            document.title = h1Content ? `${h1Content}-${globalTitle}` : globalTitle;
        }
    },
    { flush }
);

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

    .meta-info {
        display: flex;
        align-items: center;

        &-item {
            display: flex;
            align-items: center;
            margin-right: 1em;

            &-p {
                margin-right: 0.5em;
            }
        }
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

        .meta-info {
            font-size: 16vpx;
            justify-content: center;
            margin: 8vpx 0;

            &-item {
                &-p {
                    font-size: 12vpx;
                }
            }
        }
    }
}
</style>
