/** @description 无意义的空函数, 一般用作占位 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function pass() {}

/** @description 是否在晚上 */
export function getIsNight() {
    const nowHour = new Date().getHours();
    return nowHour >= 18 || nowHour < 6;
}
