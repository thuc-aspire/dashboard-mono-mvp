import { createRouter, createWebHistory } from 'vue-router';
import CasesView from '@/views/CasesView.vue';
import RulesView from '@/views/RulesView.vue';

export const router = createRouter({
  history: createWebHistory('/fincrime/'),
  routes: [
    { path: '/', redirect: '/cases' },
    { path: '/cases', component: CasesView },
    { path: '/rules', component: RulesView },
  ],
});
