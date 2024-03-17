import { createApp } from 'vue';
import App from './App.vue';
import { installPlugins } from '@/plugins';
import { getIsNight } from '@/utils';
// css configuration
import '@/assets/sass/_global.scss';

installPlugins(createApp(App)).provide('isNight', getIsNight()).mount('#app');
