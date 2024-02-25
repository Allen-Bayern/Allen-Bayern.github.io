import { createApp } from 'vue';
import App from './App.vue';
import { installPlugins } from '@/plugins';
// css reset
import 'ress/dist/ress.min.css';

installPlugins(createApp(App)).mount('#app');
