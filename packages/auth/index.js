const TOKEN_KEY = 'aspire_token';
// Root-relative on purpose: shell's client router runs at base '/' (its Vite
// asset base '/shell/' is a build/deploy detail, not a routable prefix — see
// the edge routing rules in edge/origin-request.js and the README caveat on
// shell's dual base). An unrecognized single-segment path like '/login' falls
// through the edge function to shell's bundle while the browser URL stays
// '/login', which is exactly what shell's own '/login' route expects.
const LOGIN_PATH = '/login';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isLoggedIn() {
  return !!getToken();
}

// Full browser navigation to shell's login page — each app is a separately
// deployed bundle, so an in-app router.push() can't reach another app's route.
function redirectToLogin() {
  const next = window.location.pathname + window.location.search;
  window.location.href = `${LOGIN_PATH}?next=${encodeURIComponent(next)}`;
}

export function logout() {
  clearToken();
  redirectToLogin();
}

// Registers a global nav guard that sends anyone without a token to shell's
// login page. `publicPaths` lets an app (namely shell itself) exempt routes
// like /login from the check.
export function requireAuth(router, { publicPaths = [] } = {}) {
  router.beforeEach((to) => {
    if (isLoggedIn() || publicPaths.includes(to.path)) return true;
    // Belt-and-braces loop guard: if the real browser URL is already the
    // login path, never redirect again — regardless of what the router
    // resolved `to.path` to. Without this, a dev server whose Vite `base`
    // doesn't line up with the router's base (shell's, by design) can turn
    // a route mismatch into an infinite redirect loop instead of a no-op.
    if (window.location.pathname === LOGIN_PATH) return true;
    redirectToLogin();
    return false;
  });
}
