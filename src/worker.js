// Cloudflare Worker entry point. Static files in public/ are served directly
// by Workers static assets; only /api/* requests reach this code
// (see run_worker_first in wrangler.toml).

import { handleLookup } from './lookup.js';
import { handleExample } from './example.js';

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/lookup') return handleLookup(request, env, ctx);
    if (pathname === '/api/example') return handleExample(request, env, ctx);
    if (pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ error: 'Not found.' }), {
        status: 404,
        headers: { 'content-type': 'application/json; charset=utf-8' },
      });
    }
    return env.ASSETS.fetch(request);
  },
};
