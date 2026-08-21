# dashboard-monorepo-mvp

MVP for the **Dashboard Monorepo Migration** spec (Thuc Phan, Confluence ACCESS/2669641734).
Proves the two claims that matter:

1. **Change-scoped CI/CD** — a change to one squad app builds/deploys ONLY that app;
   a change to a shared package rebuilds only its dependents. Detection is graph-based
   (`turbo --filter="...[HEAD^]"`), not YAML path filters.
2. **Independent per-prefix deploys on one domain** — each app ships to its own prefix;
   the verbatim Lambda@Edge origin-request function routes `/{app}/*`, per-app SPA
   fallback included. Simulated locally, no AWS needed.

## Layout

| Path | Maps to (production) |
|---|---|
| `apps/{shell,fincrime,cards,aspire-dash-v1,aspire-ba,aspire-os}` | one Vite build + one CI pipeline + one S3 prefix each |
| `packages/shell-ui` | `@dashboard/shell-ui` — shared chrome (header, sidebar, layout, home), source-consumed |
| `packages/auth` | `@mvp/auth` — token storage + the cross-app login guard, source-consumed |
| `edge/origin-request.js` | the CloudFront Lambda@Edge function (verbatim) |
| `.github/workflows/ci-*.yml` | per-squad pipeline (spec §6) |

## Demo

```bash
pnpm install
pnpm build && pnpm deploy:local && pnpm serve:cdn   # → http://localhost:4000
# in a second terminal:
pnpm test:edge                                       # routing contract tests
./scripts/demo-affected.sh                           # change-scoping proof
```

Browser checks on :4000 — `/` = shell; `/fincrime/cases` deep link works (per-app SPA
fallback); header nav across apps = full reload (by design); `/anything-unknown` = shell 404.

## Local dev (single app)

Each app runs its own Vite dev server on a fixed port so you can work on one app without
building/deploying the whole stack:

```bash
pnpm dev:shell            # http://localhost:5173/shell/
pnpm dev:fincrime         # http://localhost:5175/fincrime/
pnpm dev:aspire-dash-v1   # http://localhost:5176/aspire-dash-v1/
pnpm dev:cards            # http://localhost:5177/cards/
pnpm dev:aspire-ba        # http://localhost:5178/aspire-ba/
pnpm dev:aspire-os        # http://localhost:5179/aspire-os/
pnpm dev                  # all apps at once (via turbo)
```

Note the trailing app-prefix path (e.g. `/shell/`, not `/`) — each app's Vite `base` matches
its production S3 prefix, and the dev server only serves under that base.

## Auth (prototype)

Every app's `main.js` registers a `requireAuth` guard (`@mvp/auth`) before mounting. There's
no real backend — it's a token-presence check against `localStorage['aspire_token']`:

- **No token on any protected route** → full-page redirect to `/shell/login?next=<path>`.
  This is a `window.location.href` navigation, not a router push, because each app is a
  separately deployed bundle — an in-app route change can't reach another app's page.
- **Logging in** (`apps/shell/src/views/LoginView.vue`) accepts any non-empty username,
  writes a fake token via `setToken()`, and redirects to `?next` (or `/`, shell's home —
  now also the post-login "choose an app" screen via `AppPicker`).
- **Switching apps** is the existing header nav (`AppHeader`, shared via `shell-ui`) — since
  `localStorage` is per-origin, the token is already there once you land on the next app.
- **Logout** (button in `AppHeader`, every app) clears the token and redirects to `/shell/login`.

Caveat: `localStorage` is scoped per-origin. In production (`dash.aspireapp.com/{app}/*`)
and in the local CDN simulator (`:4000`) every app shares one origin, so the token carries
over. Running apps individually via `pnpm dev:*` puts each on its **own port** (5173–5179),
which counts as a different origin — logging in on one dev server won't carry over to
another. Use the CDN simulator (`pnpm build && pnpm deploy:local && pnpm serve:cdn`) to see
the cross-app login/logout/switch flow end-to-end.

## Known caveats carried from the spec (do not fix silently)

- Dot in a route param is treated as a static asset (see `edge/origin-request.test.mjs`).
- Legacy-app fallback / URL-compat story is an open spec question — this MVP does not model the legacy app.
- CI affected-detection diffs HEAD^ only: a multi-commit push may skip packages touched solely in earlier commits of that push (github.event.before has its own failure modes; out of MVP scope).
- Visiting /shell/ directly renders shell's not-found view — shell's router base is / while its asset base is /shell/ (by design; users enter at /).
