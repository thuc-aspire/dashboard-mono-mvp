<template>
  <main class="transactions-view">
    <h1>Cards — Transactions</h1>
    <table class="fake-table">
      <thead>
        <tr><th>Date</th><th>Merchant</th><th>Amount</th><th>Card</th></tr>
      </thead>
      <tbody>
        <tr><td>2026-08-20</td><td>AWS</td><td>-$1,204.10</td><td>•••• 4471</td></tr>
        <tr><td>2026-08-19</td><td>Grab</td><td>-$18.50</td><td>•••• 2290</td></tr>
        <tr><td>2026-08-19</td><td>Google Workspace</td><td>-$312.00</td><td>•••• 4471</td></tr>
        <tr><td>2026-08-18</td><td>Payroll transfer in</td><td>+$50,000.00</td><td>•••• 4471</td></tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
.transactions-view { padding: 1.5rem; }
.fake-table { border-collapse: collapse; width: 100%; margin-top: 1rem; font-size: 14px; }
.fake-table th, .fake-table td { border-bottom: 1px solid #e4e7ed; padding: 8px 12px; text-align: left; }
.fake-table th { color: #909399; font-weight: 600; }
</style>
