<script setup>
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';

defineProps({
  currentApp: { type: String, required: true },
  // Skips the header/sidebar chrome — used for public pages like /login.
  bare: { type: Boolean, default: false },
  // Skips just the sidebar — used on shell's home page, where AppPicker is
  // already the app switcher.
  sidebar: { type: Boolean, default: true },
  // The current app's own nav items, e.g. [{ label: 'Cases', to: '/cases' }].
  sidebarLinks: { type: Array, default: () => [] },
});
</script>

<template>
  <div class="app-layout">
    <template v-if="bare">
      <slot />
    </template>
    <template v-else>
      <AppHeader :current-app="currentApp" />
      <div class="app-layout__body">
        <AppSidebar v-if="sidebar" :links="sidebarLinks" />
        <main class="app-layout__content">
          <slot />
        </main>
      </div>
    </template>
  </div>
</template>

<style>
.app-layout {
  min-height: 100vh;
  flex-direction: column;
  display: flex;
}
.app-layout__body {
  flex: 1;
  min-height: 0;
  display: flex;
}
.app-layout__content {
  flex: 1;
  min-width: 0;
  overflow: auto;
}
</style>
