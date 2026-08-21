<template>
  <main class="cases-view">
    <h1>FinCrime — Cases</h1>
    <table class="fake-table">
      <thead>
        <tr><th>Case ID</th><th>Business</th><th>Status</th><th>Opened</th></tr>
      </thead>
      <tbody>
        <tr><td>CASE-1042</td><td>Acme Trading Pte Ltd</td><td>Under review</td><td>2026-08-18</td></tr>
        <tr><td>CASE-1041</td><td>Northwind Logistics</td><td>Escalated</td><td>2026-08-17</td></tr>
        <tr><td>CASE-1039</td><td>Blue Harbor Foods</td><td>Closed — no action</td><td>2026-08-14</td></tr>
        <tr><td>CASE-1035</td><td>Meridian Consulting</td><td>Pending documents</td><td>2026-08-10</td></tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
.cases-view { padding: 1.5rem; }
.fake-table { border-collapse: collapse; width: 100%; margin-top: 1rem; font-size: 14px; }
.fake-table th, .fake-table td { border-bottom: 1px solid #e4e7ed; padding: 8px 12px; text-align: left; }
.fake-table th { color: #909399; font-weight: 600; }
</style>
