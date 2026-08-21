const TOKEN_KEY = 'aspire_token';
const LOGIN_PATH = '/shell/login';

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
    redirectToLogin();
    return false;
  });
}
