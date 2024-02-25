/** @description Install global plugins. */

import { createApp } from 'vue';
import { router } from '@/router';
import { store } from '@/store';

/**
 * @description To install plugins used by the project and return the instance
 * @param appInstance The instance of the project
 * @returns The instance self
 */
export function installPlugins(appInstance: ReturnType<typeof createApp>): ReturnType<typeof createApp> {
    // Plugins used by the project
    const plugins: Parameters<typeof appInstance.use<unknown[]>>[0][] = [router, store];

    // Install plugins and return the instance
    return plugins.reduce((inst, plugin) => inst.use(plugin), appInstance);
}
