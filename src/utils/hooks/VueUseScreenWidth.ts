import { ref, onMounted, onBeforeUnmount } from 'vue';

/** @description screen width hook */
export const useScreenWidth = () => {
    // screen width变化逻辑
    const screenWidth = ref(window.screen.width);
    const getScreenWidth = () => {
        screenWidth.value = window.screen.width;
    };

    // 监听resize事件, 保证函数引用一致
    onMounted(() => {
        window.addEventListener('resize', getScreenWidth);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', getScreenWidth);
    });

    return screenWidth;
};
