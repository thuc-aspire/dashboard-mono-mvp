'use strict';
// Lambda@Edge (origin-request) — routes dash.aspireapp.com/{app-name}/* to that
// app's own build under s3://dash.aspireapp.com/{app-name}/, one prefix per
// independently deployed app. See docs: Dashboard Monorepo Migration solution spec.
// Keep in sync with apps/* as squads migrate off the legacy app.
const KNOWN_APPS = [
  'shell',
  'spend',
  'fincrime',
];
const DEFAULT_APP = 'shell';
const HAS_FILE_EXTENSION = /\.[a-zA-Z0-9]+/;
exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const uri = request.uri;
  const segments = uri.split('/').filter(Boolean);
  const [appName] = segments;
  // "/" -> shell landing page.
  if (!appName) {
    request.uri = `/${DEFAULT_APP}/index.html`;
    return callback(null, request);
  }
  if (KNOWN_APPS.includes(appName)) {
    // Static asset ("/spend/assets/xyz.js") -> serve as-is.
    if (HAS_FILE_EXTENSION.test(uri)) {
      return callback(null, request);
    }
    // Navigational request -> SPA fallback scoped to that app.
    request.uri = `/${appName}/index.html`;
    return callback(null, request);
  }
  // Single unknown segment with a file extension ("/favicon.ico", "/robots.txt")
  // -> root-level static file, served from the shell app.
  if (segments.length === 1 && HAS_FILE_EXTENSION.test(uri)) {
    request.uri = `/${DEFAULT_APP}${uri}`;
    return callback(null, request);
  }
  // Unrecognized app name -> shell handles the not-found state.
  request.uri = `/${DEFAULT_APP}/index.html`;
  return callback(null, request);
};
