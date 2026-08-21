<script setup>
import { AppHome } from '@mvp/shell-ui';

const releases = [
  { app: 'Cards', version: 'v0.1.0', date: '2026-08-01', notes: 'Debit accounts, card programs, and cashback placeholder screens.' },
];
</script>

<template>
  <AppHome :releases="releases" />
</template>
