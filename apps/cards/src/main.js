import { createApp } from 'vue';
import App from '@/App.vue';
import { router } from '@/router';
import { requireAuth } from '@mvp/auth';

requireAuth(router);
createApp(App).use(router).mount('#app');
