<script setup>
import { AppHome } from '@mvp/shell-ui';

const releases = [
  { app: 'Aspire OS', version: 'v0.1.0', date: '2026-08-01', notes: 'Initial scaffold for this app, migrated onto the shared shell chrome.' },
];
</script>

<template>
  <AppHome :releases="releases" />
</template>
