import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// css reset
import 'ress/dist/ress.min.css';

createApp(App).use(router).mount('#app');
