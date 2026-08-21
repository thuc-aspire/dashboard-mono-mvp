<script setup>
import { AppHome, AppPicker } from '@mvp/shell-ui';

const releases = [
  { app: 'Shell', version: 'v0.1.0', date: '2026-08-01', notes: 'Initial shell scaffold: auth bootstrap, top nav, app switcher.' },
  { app: 'FinCrime', version: 'v0.1.0', date: '2026-08-01', notes: 'Fraud review placeholder screens migrated out of the legacy app.' },
  { app: 'Cards', version: 'v0.1.0', date: '2026-08-01', notes: 'Debit card program placeholder screens.' },
];
</script>

<template>
  <AppHome :releases="releases">
    <AppPicker />
  </AppHome>
</template>
