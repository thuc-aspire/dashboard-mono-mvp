<script setup>
import { AppLayout } from '@mvp/shell-ui';

const sidebarLinks = [
  { label: 'Overview', to: '/overview' },
  { label: 'Settings', to: '/settings' },
];
</script>

<template>
  <AppLayout current-app="aspire-ba" :sidebar-links="sidebarLinks">
    <router-view />
  </AppLayout>
</template>
