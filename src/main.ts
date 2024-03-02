import { createApp } from 'vue';
import App from './App.vue';
import { installPlugins } from '@/plugins';
// css configuration
import '@/assets/sass/_global.scss';

installPlugins(createApp(App)).mount('#app');
