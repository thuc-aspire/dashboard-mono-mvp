<script setup>
import { AppLayout } from '@mvp/shell-ui';

const sidebarLinks = [
  { label: 'Accounts', to: '/accounts' },
  { label: 'Transactions', to: '/transactions' },
];
</script>

<template>
  <AppLayout current-app="cards" :sidebar-links="sidebarLinks">
    <router-view />
  </AppLayout>
</template>
