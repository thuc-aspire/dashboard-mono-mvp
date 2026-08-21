<template>
  <main class="rules-view">
    <h1>FinCrime — Rules</h1>
    <table class="fake-table">
      <thead>
        <tr><th>Rule</th><th>Trigger</th><th>Enabled</th></tr>
      </thead>
      <tbody>
        <tr><td>High-velocity transfers</td><td>&gt; 5 transfers in 10 min</td><td>Yes</td></tr>
        <tr><td>New payee large amount</td><td>First transfer &gt; $10,000</td><td>Yes</td></tr>
        <tr><td>Cross-border mismatch</td><td>Country ≠ registered country</td><td>No</td></tr>
        <tr><td>Round-number transfers</td><td>Amount is a round $1,000+</td><td>Yes</td></tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
.rules-view { padding: 1.5rem; }
.fake-table { border-collapse: collapse; width: 100%; margin-top: 1rem; font-size: 14px; }
.fake-table th, .fake-table td { border-bottom: 1px solid #e4e7ed; padding: 8px 12px; text-align: left; }
.fake-table th { color: #909399; font-weight: 600; }
</style>
