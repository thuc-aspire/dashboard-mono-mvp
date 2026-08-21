import { createRouter, createWebHistory } from 'vue-router';
import AccountsView from '@/views/AccountsView.vue';
import TransactionsView from '@/views/TransactionsView.vue';

export const router = createRouter({
  history: createWebHistory('/cards/'),
  routes: [
    { path: '/', redirect: '/accounts' },
    { path: '/accounts', component: AccountsView },
    { path: '/transactions', component: TransactionsView },
  ],
});
