import { cp, rm } from 'node:fs/promises';

// Simulates each squad's scoped deploy: `aws s3 sync apps/{app}/dist s3://dash.aspireapp.com/{app}/`
const apps = ['shell', 'spend', 'fincrime'];

await rm(new URL('../.cdn', import.meta.url), { recursive: true, force: true });
for (const app of apps) {
  await cp(
    new URL(`../apps/${app}/dist`, import.meta.url),
    new URL(`../.cdn/${app}`, import.meta.url),
    { recursive: true },
  );
  console.log(`deployed ${app} -> .cdn/${app}/`);
}
