<script lang="ts" setup>
// 模仿GitHub的组件
import { computed } from 'vue';

const props = withDefaults(
    defineProps<
        Partial<{
            /** 左半部分 */
            leftPart: string;
            /** 右半部分 */
            rightPart: string;
            /** 是否块级元素 */
            isBlock: boolean;
        }>
    >(),
    {
        leftPart() {
            return 'Git';
        },
        rightPart() {
            return 'Hub';
        },
        isBlock() {
            return true;
        },
    }
);

// 计算classList
const classList = computed(() => {
    const { isBlock = true } = props;
    const res = ['some-hub'];

    if (!isBlock) {
        return [...res, 'no-block'];
    }

    return res;
});
</script>

<template>
    <div :class="classList">
        <p class="some-hub-part">{{ leftPart }}</p>
        <p class="some-hub-part">{{ rightPart }}</p>
    </div>
</template>

<style lang="scss" scoped>
.no-block {
    display: inline-block;
}

.some-hub {
    display: flex;
    align-items: center;
    border-radius: 4px;

    &-part {
        font-size: 12px;
        font-weight: 500;
        padding: 0.2em 0.5em;

        @include for-phone-only {
            font-size: 10vpx;
        }

        &:first-child {
            color: #fff;
            background-color: #000;
            border-radius: 4px 0 0 4px;
        }

        &:last-child {
            color: #000;
            background-color: #f79817;
            border-radius: 0 4px 4px 0;
        }
    }
}
</style>
