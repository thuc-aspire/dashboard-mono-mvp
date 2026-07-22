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
| `apps/{shell,spend,fincrime}` | one Vite build + one CI pipeline + one S3 prefix each |
| `packages/shell-ui` | `@dashboard/shell-ui` — shared chrome, source-consumed |
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

Browser checks on :4000 — `/` = shell; `/spend/invoices` deep link works (per-app SPA
fallback); header nav across apps = full reload (by design); `/anything-unknown` = shell 404.

## Known caveats carried from the spec (do not fix silently)

- Dot in a route param is treated as a static asset (see `edge/origin-request.test.mjs`).
- Legacy-app fallback / URL-compat story is an open spec question — this MVP does not model the legacy app.
- CI affected-detection diffs HEAD^ only: a multi-commit push may skip packages touched solely in earlier commits of that push (github.event.before has its own failure modes; out of MVP scope).
- Visiting /shell/ directly renders shell's not-found view — shell's router base is / while its asset base is /shell/ (by design; users enter at /).
