<script setup>
import { reactive } from 'vue';

defineProps({
  releases: { type: Array, default: () => [] },
});

const expanded = reactive(new Set());
function toggle(i) {
  expanded.has(i) ? expanded.delete(i) : expanded.add(i);
}
</script>

<template>
  <main class="app-home">
    <section class="app-home__search-wrapper">
      <div class="app-home__search">
        <h3>Search:</h3>
        <input class="app-home__search-input" type="text" placeholder="Type to search (cmd+k)" />
      </div>

      <div class="app-home__reports">
        <div class="app-home__reports-title">DASHBOARD REPORTS</div>
        <p>If you need a feature/improvement or want to report an issue:</p>
        <ul>
          <li>Talk to us on <a href="#">Slack</a></li>
          <li>File a request via the <a href="#">feedback form</a></li>
        </ul>
      </div>

      <slot />
    </section>

    <section v-if="releases.length" class="app-home__release">
      <article v-for="(r, i) in releases" :key="r.app" class="app-home__release-card">
        <div class="app-home__release-card-title">{{ r.app }}</div>
        <div class="app-home__release-card-meta">
          <span class="app-home__tag">{{ r.version }}</span>
          <span>{{ r.date }}</span>
        </div>
        <p
          class="app-home__release-card-notes"
          :class="{ 'app-home__release-card-notes--clamped': !expanded.has(i) }"
        >
          {{ r.notes }}
        </p>
        <button type="button" class="app-home__show-more" @click="toggle(i)">
          {{ expanded.has(i) ? 'Show less' : 'See more' }}
        </button>
      </article>
    </section>
  </main>
</template>

<style scoped>
.app-home {
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 60px);
  display: flex;
}
.app-home__search-wrapper {
  justify-content: center;
  padding-top: 5rem;
  display: flex;
}
.app-home__search {
  width: 100%;
  max-width: 500px;
}
.app-home__search-input {
  box-sizing: border-box;
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
}
.app-home__reports {
  background-color: rgba(64, 158, 255, 0.1);
  border-left: 0.3rem solid #409eff;
  border-radius: 0.25rem;
  margin: 1.5rem auto 0;
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 500px;
}
.app-home__reports-title {
  font-size: 1.1rem;
  font-weight: 800;
}
.app-home__reports p,
.app-home__reports li {
  font-size: 0.85rem;
}
.app-home__release {
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: auto;
  padding: 2rem 1rem;
  display: flex;
}
.app-home__release-card {
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  width: 220px;
  padding: 1rem;
  font-size: 12px;
}
.app-home__release-card-title {
  font-weight: 700;
  margin-bottom: 8px;
}
.app-home__release-card-meta {
  color: #909399;
  justify-content: space-between;
  display: flex;
  margin-bottom: 8px;
}
.app-home__tag {
  background: #ecf5ff;
  color: #409eff;
  border-radius: 4px;
  padding: 2px 8px;
}
.app-home__release-card-notes--clamped {
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
}
.app-home__show-more {
  color: #409eff;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  font-size: 12px;
}
</style>
