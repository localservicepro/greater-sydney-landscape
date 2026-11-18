#!/usr/bin/env node
/* Post-build SEO/quality checks over dist/. Exits non-zero on hard failures. */
import fs from 'node:fs';
import path from 'node:path';
const dist = path.resolve('dist');
const files = [];
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (e.name.endsWith('.html')) files.push(p); } })(dist);
let hard = 0;
const unesc = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
for (const f of files.sort()) {
  const html = fs.readFileSync(f, 'utf8');
  const rel = path.relative(dist, f);
  const title = unesc((html.match(/<title>(.*?)<\/title>/) || [])[1] || '');
  const desc = unesc((html.match(/<meta name="description" content="(.*?)"/) || [])[1] || '');
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => strip(m[1]).trim());
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const noAlt = imgs.filter((t) => !/\salt="[^"]+"/.test(t));
  const noDims = imgs.filter((t) => !/\swidth="/.test(t) || !/\sheight="/.test(t));
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  let badSchema = 0; const types = [];
  for (const s of schemas) { try { const o = JSON.parse(s); types.push(Array.isArray(o['@type']) ? o['@type'][0] : o['@type']); } catch { badSchema++; } }
  const links = [...html.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1]).filter((h) => !h.startsWith('/assets'));
  const broken = [...new Set(links)].filter((h) => { const p = path.join(dist, h.endsWith('/') ? h + 'index.html' : h); return !fs.existsSync(p) && !fs.existsSync(path.join(dist, h, 'index.html')); });
  const text = strip(html).toLowerCase();
  const words = text.split(/\s+/).filter(Boolean).length;
  const tokens = ['___', '{{', 'lorem', 'TODO'].filter((t) => html.includes(t));
  const issues = [];
  if (h1s.length !== 1) issues.push(`H1 count ${h1s.length}`), hard++;
  if (title.length > 60) issues.push(`title ${title.length} chars`);
  if (desc.length > 155) issues.push(`description ${desc.length} chars`);
  if (noAlt.length) issues.push(`${noAlt.length} img without alt`), hard++;
  if (noDims.length) issues.push(`${noDims.length} img without width/height`);
  if (badSchema) issues.push(`${badSchema} invalid JSON-LD`), hard++;
  if (broken.length) issues.push(`broken links: ${broken.join(', ')}`), hard++;
  if (tokens.length) issues.push(`leftover tokens: ${tokens.join(',')}`), hard++;
  if (!html.includes('data-tracking-id="tk_')) issues.push('tracking script missing'), hard++;
  const kw = rel === 'index.html' ? 'lawn mowing' : null;
  const kwCount = kw ? (text.match(new RegExp(kw, 'g')) || []).length : null;
  console.log(`${rel.padEnd(38)} words ${String(words).padStart(5)} | title ${String(title.length).padStart(2)} | desc ${String(desc.length).padStart(3)} | imgs ${String(imgs.length).padStart(2)} | schema ${types.join('+')}${kw ? ` | "${kw}" x${kwCount} (${(kwCount * 2 / words * 100).toFixed(2)}%)` : ''}${issues.length ? '\n   !! ' + issues.join('; ') : ''}`);
}
for (const extra of ['sitemap.xml', 'robots.txt', '_redirects', 'site.webmanifest', 'favicon.ico', '404.html']) if (!fs.existsSync(path.join(dist, extra))) { console.log('missing', extra); hard++; }
console.log(hard ? `\n${hard} hard failure(s)` : '\nAll hard checks passed');
process.exit(hard ? 1 : 0);
