<script setup>
import { AppLayout } from '@mvp/shell-ui';

const sidebarLinks = [
  { label: 'Cases', to: '/cases' },
  { label: 'Rules', to: '/rules' },
];
</script>

<template>
  <AppLayout current-app="fincrime" :sidebar-links="sidebarLinks">
    <router-view />
  </AppLayout>
</template>
