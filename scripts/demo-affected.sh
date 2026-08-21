#!/usr/bin/env bash
# Proves change-scoped CI: which packages does turbo consider affected by the last commit?
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "working tree not clean — commit or stash first (this script creates and hard-resets demo commits)" >&2
  exit 1
fi

affected() {
  pnpm exec turbo run build --filter="...[HEAD^]" --dry-run=json | jq -r '.packages[] | select(. != "//")' | sort
}

echo "=== 1) Touch ONE app (apps/cards) ==="
printf '\n' >> apps/cards/src/App.vue
git commit -qam "demo: touch cards"
affected   # expect: @mvp/cards only

echo "=== 2) Touch the SHARED package (packages/shell-ui) ==="
printf '\n' >> packages/shell-ui/AppHeader.vue
git commit -qam "demo: touch shell-ui"
affected   # expect: all apps (dependents of shell-ui)

echo "=== 3) Touch nothing in the graph (README) ==="
printf '\n' >> README.md
git commit -qam "demo: touch readme"
affected || true   # expect: empty (root-only change; turbo's root package "//" filtered out)

echo "=== cleanup: dropping the 3 demo commits ==="
git reset --hard HEAD~3
