import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { crossAppProxy } from '../../scripts/dev-proxy.mjs';

export default defineConfig(({ command }) => ({
  // Shell is the one app with a dual base by design: its production/CDN
  // *asset* base is '/shell/' (its S3 prefix), but its client router runs at
  // '/' (see edge/origin-request.js — unrecognized root-level paths like
  // '/login' fall through to shell while the browser URL stays unprefixed).
  // The dev server has no edge function in front of it, so it must actually
  // serve at '/' to match the router; only the production build uses '/shell/'.
  base: command === 'build' ? '/shell/' : '/',
  plugins: [vue()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: crossAppProxy('shell'),
  },
}));
