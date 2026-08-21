<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { AppLayout } from '@mvp/shell-ui';

const route = useRoute();
const bare = computed(() => route.meta.public === true);
</script>

<template>
  <AppLayout current-app="shell" :bare="bare">
    <router-view />
  </AppLayout>
</template>
