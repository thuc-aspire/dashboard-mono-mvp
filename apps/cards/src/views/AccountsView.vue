<template>
  <main class="accounts-view">
    <h1>Cards — Accounts</h1>
    <table class="fake-table">
      <thead>
        <tr><th>Account</th><th>Holder</th><th>Balance</th><th>Status</th></tr>
      </thead>
      <tbody>
        <tr><td>DEB-2201</td><td>Acme Trading Pte Ltd</td><td>$48,210.55</td><td>Active</td></tr>
        <tr><td>DEB-2189</td><td>Northwind Logistics</td><td>$12,004.00</td><td>Active</td></tr>
        <tr><td>DEB-2144</td><td>Blue Harbor Foods</td><td>$0.00</td><td>Frozen</td></tr>
        <tr><td>DEB-2098</td><td>Meridian Consulting</td><td>$5,732.40</td><td>Active</td></tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
.accounts-view { padding: 1.5rem; }
.fake-table { border-collapse: collapse; width: 100%; margin-top: 1rem; font-size: 14px; }
.fake-table th, .fake-table td { border-bottom: 1px solid #e4e7ed; padding: 8px 12px; text-align: left; }
.fake-table th { color: #909399; font-weight: 600; }
</style>
