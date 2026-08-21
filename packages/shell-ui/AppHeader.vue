<script setup>
import { logout } from '@mvp/auth';

defineProps({
  currentApp: { type: String, required: true },
});
</script>

<template>
  <header class="app-header">
    <strong class="app-header__brand">Aspire Ops (MVP)</strong>
    <nav class="app-header__nav">
      <a href="/" :class="['app-header__link', { 'app-header__link--active': currentApp === 'shell' }]">Home</a>
    </nav>
    <button type="button" class="app-header__logout" @click="logout()">Logout</button>
  </header>
</template>

<style>
.app-header { display: flex; align-items: center; gap: 16px; padding: 12px 24px; border-bottom: 1px solid #ddd; font-family: sans-serif; }
.app-header__nav { flex: 1; display: flex; gap: 12px; }
.app-header__link--active { font-weight: 700; }
.app-header__logout { cursor: pointer; background: none; border: 1px solid #ddd; border-radius: 4px; padding: 4px 12px; font-size: 0.85rem; }
</style>
