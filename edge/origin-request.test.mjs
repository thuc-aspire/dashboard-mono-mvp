import assert from 'node:assert/strict';
import { test } from 'node:test';
import edge from './origin-request.js';

const route = (uri) => new Promise((resolve) => {
  edge.handler({ Records: [{ cf: { request: { uri } } }] }, {}, (_error, request) => resolve(request.uri));
});

test('root serves shell index', async () => {
  assert.equal(await route('/'), '/shell/index.html');
});

test('known app bare prefix gets its own SPA fallback', async () => {
  assert.equal(await route('/cards'), '/cards/index.html');
  assert.equal(await route('/cards/'), '/cards/index.html');
});

test('known app deep link gets its own SPA fallback', async () => {
  assert.equal(await route('/cards/accounts'), '/cards/index.html');
  assert.equal(await route('/fincrime/cases'), '/fincrime/index.html');
});

test('known app static asset passes through untouched', async () => {
  assert.equal(await route('/cards/assets/index-abc123.js'), '/cards/assets/index-abc123.js');
});

test('root-level file maps into shell prefix', async () => {
  assert.equal(await route('/favicon.ico'), '/shell/favicon.ico');
});

test('unknown app falls back to shell not-found', async () => {
  assert.equal(await route('/legacy-resource/uuid-1/show'), '/shell/index.html');
});

// KNOWN CAVEAT (raised in spec review): a dot in the URI's FINAL segment is
// treated as a static asset, so a trailing route param containing a dot would
// 404 at origin instead of SPA-falling-back. A dot in a non-final segment is
// unaffected. Documented here on purpose — do not "fix" without Thuc's sign-off.
test('caveat: dot in a trailing route param is (mis)treated as a static asset', async () => {
  assert.equal(await route('/cards/recipients/john.doe'), '/cards/recipients/john.doe');
  assert.equal(await route('/cards/recipients/john.doe/show'), '/cards/index.html');
});
