import { createRouter, createWebHistory } from 'vue-router';
import InvoicesView from '@/views/InvoicesView.vue';
import TransfersView from '@/views/TransfersView.vue';

export const router = createRouter({
  history: createWebHistory('/spend/'),
  routes: [
    { path: '/', redirect: '/invoices' },
    { path: '/invoices', component: InvoicesView },
    { path: '/transfers', component: TransfersView },
  ],
});
