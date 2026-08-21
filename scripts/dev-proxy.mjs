export const DEV_PORTS = {
  shell: 5173,
  fincrime: 5175,
  cards: 5177,
  'aspire-dash-v1': 5176,
  'aspire-ba': 5178,
  'aspire-os': 5179,
};

// `vite dev` has no edge function in front of it the way production and the
// CDN simulator do, so cross-app links (AppPicker tiles, /login redirects
// from a non-shell app) 404 or fall through to the wrong app's SPA when each
// app runs on its own port. Each app's dev server proxies every OTHER app's
// prefix (and shell's root-relative /login) to that app's own dev port,
// approximating edge/origin-request.js locally so `pnpm dev` behaves like
// the CDN simulator.
export function crossAppProxy(selfApp) {
  const proxy = {};
  for (const [app, port] of Object.entries(DEV_PORTS)) {
    if (app === selfApp || app === 'shell') continue;
    proxy[`/${app}`] = { target: `http://localhost:${port}`, changeOrigin: true, ws: true };
  }
  if (selfApp !== 'shell') {
    const shellTarget = { target: `http://localhost:${DEV_PORTS.shell}`, changeOrigin: true, ws: true };
    proxy['/login'] = shellTarget;
    // '^/$' (regex key) matches only the exact root path — a plain '/' key
    // would prefix-match every request this server gets, proxying its own
    // app away. This makes the header's "Home" link work from any app too.
    proxy['^/$'] = shellTarget;
  }
  return proxy;
}
