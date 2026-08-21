import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { crossAppProxy } from '../../scripts/dev-proxy.mjs';

export default defineConfig({
  base: '/fincrime/',
  plugins: [vue()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: {
    port: 5175,
    strictPort: true,
    proxy: crossAppProxy('fincrime'),
  },
});
