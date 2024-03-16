import { onMounted, onBeforeUnmount } from 'vue';
import { globalTitle } from '../constants';

/**
 * @description
 * @param titleSet 被设置的 document Title
 * @param opts 设置兜底title及连字符
 */
export function useTitle(
    titleSet: string,
    opts = {
        baseTitle: globalTitle,
        hyphen: '-',
    }
) {
    const { baseTitle, hyphen } = opts;
    onMounted(() => {
        document.title = titleSet ? `${titleSet}${hyphen}${baseTitle}` : baseTitle;
    });

    onBeforeUnmount(() => {
        document.title = baseTitle;
    });
}
