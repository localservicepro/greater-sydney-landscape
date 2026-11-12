import { services } from '../data/site.js';
import { generated } from '../data/generated.js';
import { render as renderHome } from './home.js';
import { renderService, renderServicesIndex } from './service.js';
import { renderAbout, renderAreas, renderContact, renderThankYou, renderNotFound } from './misc.js';

const ctx = { generated };

export const pages = [
  { path: '/', priority: 1.0, changefreq: 'weekly', render: () => renderHome(ctx) },
  { path: '/services/', priority: 0.9, render: () => renderServicesIndex(ctx) },
  ...services.map((s) => ({ path: `/services/${s.slug}/`, priority: 0.9, render: () => renderService(s, ctx) })),
  { path: '/about/', priority: 0.6, render: renderAbout },
  { path: '/areas/', priority: 0.8, render: renderAreas },
  { path: '/contact/', priority: 0.8, render: renderContact },
  { path: '/thank-you/', noindex: true, render: renderThankYou },
  { path: '/404.html', noindex: true, render: renderNotFound },
];
