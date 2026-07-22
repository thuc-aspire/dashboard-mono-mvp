#!/usr/bin/env bash
# Proves change-scoped CI: which packages does turbo consider affected by the last commit?
set -euo pipefail

affected() {
  pnpm exec turbo run build --filter="...[HEAD^]" --dry-run=json | jq -r '.packages[]' | sort
}

echo "=== 1) Touch ONE app (apps/spend) ==="
printf '\n' >> apps/spend/src/App.vue
git commit -qam "demo: touch spend"
affected   # expect: @mvp/spend only

echo "=== 2) Touch the SHARED package (packages/shell-ui) ==="
printf '\n' >> packages/shell-ui/AppHeader.vue
git commit -qam "demo: touch shell-ui"
affected   # expect: all three apps (dependents of shell-ui)

echo "=== 3) Touch nothing in the graph (README) ==="
printf '\n' >> README.md
git commit -qam "demo: touch readme"
affected || true   # expect: empty

echo "=== cleanup: dropping the 3 demo commits ==="
git reset --hard HEAD~3
