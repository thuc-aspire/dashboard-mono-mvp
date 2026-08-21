<script setup>
import { APPS } from './apps.js';

const apps = APPS.filter((app) => app.app !== 'shell');
</script>

<template>
  <section class="app-picker">
    <h3 class="app-picker__title">Choose an app</h3>
    <div class="app-picker__grid">
      <a v-for="app in apps" :key="app.app" :href="app.href" class="app-picker__tile">
        {{ app.label }}
      </a>
    </div>
  </section>
</template>

<style scoped>
.app-picker {
  width: 100%;
  max-width: 500px;
  margin: 1.5rem auto 0;
}
.app-picker__title {
  font-size: 1.1rem;
  font-weight: 800;
}
.app-picker__grid {
  flex-wrap: wrap;
  gap: 12px;
  display: flex;
}
.app-picker__tile {
  color: #303133;
  text-align: center;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  flex: 1 1 120px;
  padding: 16px 8px;
  text-decoration: none;
  font-weight: 600;
}
.app-picker__tile:hover {
  border-color: #409eff;
  color: #409eff;
}
</style>
