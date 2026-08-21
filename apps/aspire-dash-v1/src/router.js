import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

export const router = createRouter({
  history: createWebHistory('/aspire-dash-v1/'),
  routes: [{ path: '/', component: HomeView }],
});
