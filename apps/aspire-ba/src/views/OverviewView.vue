<template>
  <main class="overview-view">
    <h1>Aspire BA — Overview</h1>
    <div class="stats">
      <div class="stat"><span class="stat__value">312</span><span class="stat__label">Reports generated</span></div>
      <div class="stat"><span class="stat__value">27</span><span class="stat__label">Dashboards</span></div>
      <div class="stat"><span class="stat__value">4.2k</span><span class="stat__label">Data points/day</span></div>
    </div>
  </main>
</template>

<style scoped>
.overview-view { padding: 1.5rem; }
.stats { display: flex; gap: 16px; margin-top: 1rem; }
.stat { background: #fff; border: 1px solid #e4e7ed; border-radius: 4px; padding: 16px 24px; }
.stat__value { display: block; font-size: 1.5rem; font-weight: 700; }
.stat__label { color: #909399; font-size: 0.85rem; }
</style>
