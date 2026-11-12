#!/usr/bin/env node
/* Static site build — renders every page from src/pages into dist/ with clean URLs.
   Usage: node build.mjs */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { business } from './src/data/site.js';
import { pages } from './src/pages/index.js';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const assets = path.join(root, 'src', 'assets');

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

// Copy static assets (skip raw originals and the manifest).
const copyDir = (from, to) => {
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    if (entry.name === 'raw' || entry.name === 'manifest.json') continue;
    const src = path.join(from, entry.name), dst = path.join(to, entry.name);
    if (entry.isDirectory()) { fs.mkdirSync(dst, { recursive: true }); copyDir(src, dst); }
    else fs.copyFileSync(src, dst);
  }
};
fs.mkdirSync(path.join(dist, 'assets'), { recursive: true });
copyDir(assets, path.join(dist, 'assets'));
fs.copyFileSync(path.join(dist, 'assets/img/favicon-32.png'), path.join(dist, 'favicon.ico'));

// Render pages.
const written = [];
for (const pg of pages) {
  const html = pg.render();
  const outPath = pg.path === '/404.html' ? path.join(dist, '404.html') : path.join(dist, pg.path, 'index.html');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  if (!pg.noindex) written.push({ path: pg.path, priority: pg.priority ?? 0.7, changefreq: pg.changefreq ?? 'monthly' });
}

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${written.map((p) => `  <url><loc>${business.url}${p.path}</loc><lastmod>${today}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority.toFixed(1)}</priority></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

// robots.txt
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /thank-you/\n\nSitemap: ${business.url}/sitemap.xml\n`);

// Web app manifest
fs.writeFileSync(path.join(dist, 'site.webmanifest'), JSON.stringify({
  name: business.name, short_name: 'GSL', start_url: '/', display: 'browser', background_color: '#ffffff', theme_color: '#121b1f',
  icons: [{ src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' }],
}, null, 2));

// Netlify-style redirects (also mirrored in netlify.toml / vercel.json at the repo root).
fs.writeFileSync(path.join(dist, '_redirects'), fs.readFileSync(path.join(root, 'redirects.txt'), 'utf8'));
fs.writeFileSync(path.join(dist, '_headers'), `/*\n  X-Content-Type-Options: nosniff\n  X-Frame-Options: SAMEORIGIN\n  Referrer-Policy: strict-origin-when-cross-origin\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n`);

console.log(`Built ${pages.length} pages → dist/ (${written.length} in sitemap)`);
