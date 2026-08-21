import { createApp } from 'vue';
import App from '@/App.vue';
import { router } from '@/router';
import { requireAuth } from '@mvp/auth';

requireAuth(router, { publicPaths: ['/login'] });
createApp(App).use(router).mount('#app');
