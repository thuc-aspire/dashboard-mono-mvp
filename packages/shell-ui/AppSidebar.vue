<script setup>
import { ref } from 'vue';

defineProps({
  links: { type: Array, default: () => [] },
});

const collapsed = ref(false);
</script>

<template>
  <aside class="app-sidebar" :class="{ 'app-sidebar--collapsed': collapsed }">
    <nav class="app-sidebar__nav">
      <router-link
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="app-sidebar__link"
        active-class="app-sidebar__link--active"
      >
        {{ collapsed ? link.label[0] : link.label }}
      </router-link>
    </nav>
    <button type="button" class="app-sidebar__toggle" @click="collapsed = !collapsed">
      {{ collapsed ? '»' : '« Collapse' }}
    </button>
  </aside>
</template>

<style>
.app-sidebar { background: #0c365a; color: #fff; width: 200px; flex-shrink: 0; flex-direction: column; justify-content: space-between; transition: width 0.2s ease; display: flex; }
.app-sidebar--collapsed { width: 48px; }
.app-sidebar__nav { flex-direction: column; display: flex; }
.app-sidebar__link { color: #fff; padding: 12px 16px; text-decoration: none; white-space: nowrap; overflow: hidden; }
.app-sidebar__link:hover { background: rgba(255, 255, 255, 0.08); }
.app-sidebar__link--active { background: rgba(255, 255, 255, 0.15); font-weight: 700; border-left: 3px solid #00d367; }
.app-sidebar__toggle { color: #fff; cursor: pointer; white-space: nowrap; background: none; border: none; border-top: 1px solid rgba(255, 255, 255, 0.15); padding: 8px 16px; font-size: 0.75rem; }
</style>
