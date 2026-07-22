<script setup>
defineProps({
  currentApp: { type: String, required: true },
});

const links = [
  { app: 'shell', label: 'Home', href: '/' },
  { app: 'spend', label: 'Spend', href: '/spend/' },
  { app: 'fincrime', label: 'FinCrime', href: '/fincrime/' },
];
</script>

<template>
  <header class="app-header">
    <strong class="app-header__brand">Aspire Ops (MVP)</strong>
    <nav class="app-header__nav">
      <a
        v-for="link in links"
        :key="link.app"
        :href="link.href"
        :class="['app-header__link', { 'app-header__link--active': link.app === currentApp }]"
      >{{ link.label }}</a>
    </nav>
  </header>
</template>

<style>
.app-header { display: flex; gap: 16px; padding: 12px 24px; border-bottom: 1px solid #ddd; font-family: sans-serif; }
.app-header__nav { display: flex; gap: 12px; }
.app-header__link--active { font-weight: 700; }
</style>
