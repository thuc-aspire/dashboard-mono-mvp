import { createRouter, createWebHistory } from 'vue-router';
import OverviewView from '@/views/OverviewView.vue';
import SettingsView from '@/views/SettingsView.vue';

export const router = createRouter({
  history: createWebHistory('/aspire-dash-v1/'),
  routes: [
    { path: '/', redirect: '/overview' },
    { path: '/overview', component: OverviewView },
    { path: '/settings', component: SettingsView },
  ],
});
