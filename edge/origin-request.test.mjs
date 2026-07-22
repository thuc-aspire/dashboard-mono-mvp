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
  assert.equal(await route('/spend'), '/spend/index.html');
  assert.equal(await route('/spend/'), '/spend/index.html');
});

test('known app deep link gets its own SPA fallback', async () => {
  assert.equal(await route('/spend/invoices'), '/spend/index.html');
  assert.equal(await route('/fincrime/cases'), '/fincrime/index.html');
});

test('known app static asset passes through untouched', async () => {
  assert.equal(await route('/spend/assets/index-abc123.js'), '/spend/assets/index-abc123.js');
});

test('root-level file maps into shell prefix', async () => {
  assert.equal(await route('/favicon.ico'), '/shell/favicon.ico');
});

test('unknown app falls back to shell not-found', async () => {
  assert.equal(await route('/legacy-resource/uuid-1/show'), '/shell/index.html');
});

// KNOWN CAVEAT (raised in spec review): a dot anywhere in the URI is treated as a
// static asset, so a route param containing a dot would 404 at origin instead of
// SPA-falling-back. Documented here on purpose — do not "fix" without Thuc's sign-off.
test('caveat: dot in a route param is (mis)treated as a static asset', async () => {
  assert.equal(await route('/spend/recipients/john.doe/show'), '/spend/recipients/john.doe/show');
});
