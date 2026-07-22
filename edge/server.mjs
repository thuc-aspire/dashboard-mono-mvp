import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import edge from './origin-request.js';

const CDN_ROOT = fileURLToPath(new URL('../.cdn', import.meta.url));
const CONTENT_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
};

const rewriteUri = (uri) => new Promise((resolve) => {
  edge.handler({ Records: [{ cf: { request: { uri } } }] }, {}, (_error, request) => resolve(request.uri));
});

createServer(async (incoming, response) => {
  const requestPath = new URL(incoming.url, 'http://localhost').pathname;
  const rewrittenUri = await rewriteUri(requestPath);
  const filePath = normalize(join(CDN_ROOT, rewrittenUri));
  if (!filePath.startsWith(CDN_ROOT)) {
    response.writeHead(403);
    response.end();
    return;
  }
  try {
    const body = await readFile(filePath);
    response.writeHead(200, { 'content-type': CONTENT_TYPES[extname(filePath)] ?? 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404, { 'content-type': 'text/plain' });
    response.end(`404 (origin miss): ${requestPath} -> ${rewrittenUri}`);
  }
}).listen(4000, () => {
  console.log('edge simulator: http://localhost:4000  (serving .cdn/ through origin-request.js)');
});
