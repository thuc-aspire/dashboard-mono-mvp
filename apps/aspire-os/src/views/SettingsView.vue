<template>
  <main class="settings-view">
    <h1>Aspire OS — Settings</h1>
    <ul class="settings-list">
      <li><strong>Deploy region</strong> — ap-southeast-1</li>
      <li><strong>Alerting</strong> — PagerDuty (on-call)</li>
      <li><strong>Log retention</strong> — 90 days</li>
      <li><strong>Maintenance window</strong> — Sundays 02:00–04:00 SGT</li>
    </ul>
  </main>
</template>

<style scoped>
.settings-view { padding: 1.5rem; }
.settings-list { margin-top: 1rem; padding-left: 0; list-style: none; }
.settings-list li { border-bottom: 1px solid #e4e7ed; padding: 10px 0; font-size: 14px; }
</style>
