import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { business, address, areas, services, foldedServices, serviceList } from '../data/site.js';
import { createHash } from 'node:crypto';
const __assets = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'assets');
const assetVersion = (rel) => createHash('md5').update(fs.readFileSync(path.join(__assets, rel))).digest('hex').slice(0, 8);
const CSS_V = assetVersion('css/main.css');
const JS_V = assetVersion('js/main.js');
import { icon } from './icons.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '../assets/img/manifest.json'), 'utf8'));

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const abs = (p) => `${business.url}${p}`;

/* Responsive image helper. Reads real dimensions from the manifest so every <img> has width/height (no CLS). */
export function img(key, { alt, sizes = '(max-width: 700px) 100vw, 50vw', loading = 'lazy', fetchpriority, className = '', decoding = 'async', style = '' } = {}) {
  const m = manifest[key];
  if (!m) throw new Error(`Unknown image key: ${key}`);
  const widths = m.widths;
  const largest = widths[widths.length - 1];
  const srcset = widths.map((w) => `/assets/img/${key}-${w}.webp ${w}w`).join(', ');
  const h = Math.round(m.h * largest / m.w);
  return `<img src="/assets/img/${key}-${largest}.webp" srcset="${srcset}" sizes="${sizes}" width="${largest}" height="${h}" alt="${esc(alt)}" loading="${loading}" decoding="${decoding}"${fetchpriority ? ` fetchpriority="${fetchpriority}"` : ''}${className ? ` class="${className}"` : ''}${style ? ` style="${style}"` : ''}>`;
}
export const imgPreload = (key) => {
  const m = manifest[key];
  const srcset = m.widths.map((w) => `/assets/img/${key}-${w}.webp ${w}w`).join(', ');
  return `<link rel="preload" as="image" imagesrcset="${srcset}" imagesizes="100vw" fetchpriority="high">`;
};

/* ---------- Schema ---------- */
export const localBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
  '@id': `${business.url}/#business`,
  name: business.name,
  alternateName: 'GSL',
  url: business.url + '/',
  telephone: business.phoneRaw,
  email: business.email,
  image: abs('/assets/img/og-image.jpg'),
  logo: abs('/assets/img/logo.webp'),
  priceRange: '$$',
  founder: { '@type': 'Person', name: business.owner },
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.street,
    addressLocality: business.suburb,
    addressRegion: business.state,
    postalCode: business.postcode,
    addressCountry: business.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
  areaServed: areas.map((a) => ({ '@type': 'Place', name: `${a.name}, NSW` })),
  openingHoursSpecification: business.hours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
  sameAs: [business.gmb, business.facebook, business.instagram, business.youtube],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Lawn and garden services',
    itemListElement: serviceList.map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
  },
});

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
});

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const serviceSchema = (s) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${business.url}/services/${s.slug}/#service`,
  name: s.name,
  serviceType: s.name,
  description: s.description,
  url: abs(`/services/${s.slug}/`),
  image: abs(`/assets/img/${s.image}-${manifest[s.image].widths.slice(-1)[0]}.webp`),
  provider: { '@id': `${business.url}/#business` },
  areaServed: areas.map((a) => ({ '@type': 'Place', name: `${a.name}, NSW` })),
  offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'AUD', url: abs('/contact/#quote') },
});

/* ---------- Animated service-area route map ----------
   Background artwork is a Higgsfield-generated stylised map of Greater Sydney (brand palette).
   The route, pins, labels and mower are inline SVG so they stay crisp and are real text for search.
   The mower rides the route with SMIL animateMotion (constant speed), and the lime "cut line"
   draws at the same rate via stroke-dashoffset, so they stay in sync. */
export const routeStops = [
  { name: 'Toongabbie', x: 470, y: 430, home: true },
  { name: 'Blacktown', x: 300, y: 390, label: 'left' },
  { name: 'The Hills', x: 520, y: 260 },
  { name: 'Dural', x: 610, y: 130 },
  { name: 'Hornsby', x: 800, y: 170 },
  { name: 'Inner West', x: 850, y: 530 },
  { name: 'Sydney', x: 1010, y: 470 },
  { name: 'Parramatta', x: 560, y: 470, label: 'below' },
];
const routePath = 'M470,430 C400,420 340,410 300,390 C330,320 440,300 520,260 C560,210 580,170 610,130 C680,120 740,150 800,170 C840,280 860,400 850,530 C900,520 960,500 1010,470 C900,520 700,500 560,470 C530,470 500,450 470,430 Z';
const ROUTE_SECONDS = 20;

export function routeMapFigure({ focus = [], alt = '', light = false } = {}) {
  const stopsText = `${areas.map((a) => a.name).slice(0, -1).join(', ')} and ${areas.slice(-1)[0].name}`;
  const pins = routeStops.map((st, i) => `
      <g class="pin${st.home ? ' is-home' : ''}${focus.includes(st.name) ? ' is-focus' : ''}" transform="translate(${st.x} ${st.y})">
        <circle class="pulse" r="9" style="animation-delay:${(i * ROUTE_SECONDS / routeStops.length).toFixed(1)}s"></circle>
        <circle class="dot" r="${st.home ? 10 : 8}"></circle>
        <text x="${st.label === 'left' ? -18 : 0}" y="${st.label === 'left' ? 11 : (st.label === 'below' || st.y < 200) ? 44 : -24}" text-anchor="${st.label === 'left' ? 'end' : 'middle'}">${esc(st.name)}${st.home ? ' · HQ' : ''}</text>
      </g>`).join('');
  return `
<div class="route-figure${light ? ' route-figure--light' : ''}">
  <div class="route-map" role="img" aria-label="Map of Greater Sydney showing the Greater Sydney Landscapes service route from Toongabbie through ${esc(stopsText)}">
    ${img('service-map', { alt: alt || `Stylised map of Greater Sydney showing the Greater Sydney Landscapes service area — ${stopsText}`, sizes: '(max-width: 900px) 100vw, 600px' })}
    <svg viewBox="0 0 1200 800" aria-hidden="true" focusable="false">
      <defs>
        <filter id="mower-shadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000" flood-opacity=".45"/></filter>
      </defs>
      <path id="route" class="route-guide" d="${routePath}" pathLength="1"></path>
      <path class="route-draw" d="${routePath}" pathLength="1" style="animation-duration:${ROUTE_SECONDS}s"></path>
      ${pins}
      <g class="mower" filter="url(#mower-shadow)">
        <g class="mower__body">
          <rect x="-26" y="-18" width="52" height="36" rx="9" fill="#a3ca22"></rect>
          <rect x="-26" y="-18" width="52" height="36" rx="9" fill="none" stroke="#121b1f" stroke-width="3"></rect>
          <rect x="-12" y="-11" width="30" height="22" rx="5" fill="#121b1f"></rect>
          <rect x="-6" y="-6" width="14" height="12" rx="3" fill="#6ebb26"></rect>
          <rect x="18" y="-8" width="12" height="16" rx="3" fill="#1fa334"></rect>
          <rect x="-30" y="-24" width="12" height="8" rx="3" fill="#121b1f"></rect>
          <rect x="-30" y="16" width="12" height="8" rx="3" fill="#121b1f"></rect>
          <rect x="12" y="-26" width="14" height="9" rx="3" fill="#121b1f"></rect>
          <rect x="12" y="17" width="14" height="9" rx="3" fill="#121b1f"></rect>
        </g>
        <animateMotion dur="${ROUTE_SECONDS}s" repeatCount="indefinite" rotate="auto" calcMode="paced"><mpath href="#route"></mpath></animateMotion>
      </g>
    </svg>
  </div>
  <ul class="route-stops" aria-label="Suburbs and regions we service">
    ${routeStops.map((st) => `<li class="${st.home ? 'is-home' : ''}${focus.includes(st.name) ? ' is-focus' : ''}"><a href="/areas/#${areas.find((a) => a.name === st.name).slug}">${esc(st.name)}</a></li>`).join('')}
  </ul>
</div>`;
}

/* ---------- Shared markup ---------- */
// Google Business Profile map embed supplied by the client (listing: Greater Sydney Landscapes).
export const gmbMap = () => `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53118.815010268016!2d151.04147145!3d-33.68498185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x651a2fd37caddaa9%3A0xfc972c2d9df3abde!2sGreater%20Sydney%20Landscapes!5e0!3m2!1sen!2sph!4v1792074629657!5m2!1sen!2sph" title="Greater Sydney Landscapes on Google Maps" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;

export const faqBlock = (faqs) => `
  <div class="faq">
    ${faqs.map((f) => `
    <details>
      <summary>${esc(f.q)}<span class="plus">${icon('plus').replace('<svg', '<svg stroke="currentColor"')}</span></summary>
      <div class="faq__a"><p>${esc(f.a)}</p></div>
    </details>`).join('')}
  </div>`;

export const ctaBand = ({ heading = 'Ready for a lawn you don’t have to think about?', sub = 'Tell us the address and what you need. We’ll come back with a fixed price, usually the same day.' } = {}) => `
  <section class="cta-band section--tight section angle-top angle-bottom" aria-labelledby="cta-heading">
    <div class="cta-band__sw" aria-hidden="true"><i></i><i></i><i></i></div>
    <div class="container cta-band__inner">
      <div>
        <div class="eyebrow">Free quotes across Greater Sydney</div>
        <h2 id="cta-heading">${esc(heading)}</h2>
        <p style="color:#b9c3bd;margin:12px 0 0;max-width:560px">${esc(sub)}</p>
      </div>
      <div class="btn-group">
        <a class="btn btn--lg" href="/contact/#quote">Get a Free Quote</a>
        <a class="btn btn--ghost btn--lg" href="tel:${business.phoneRaw}">${icon('phone').replace('<svg', '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"')} ${business.phone}</a>
      </div>
    </div>
  </section>`;

export const quoteForm = ({ heading = 'Get a free quote', note = 'Tell us about the property and what needs doing. We reply within one business day, usually sooner.' } = {}) => `
  <form class="quote-form" id="quote" data-quote-form data-redirect="/thank-you/" method="post" action="/thank-you/" novalidate>
    <h3>${esc(heading)}</h3>
    <p class="form-note">${esc(note)}</p>
    <div class="form-grid">
      <div class="field"><label for="full_name">Name</label><input id="full_name" name="full_name" type="text" autocomplete="name" required><div class="form-error">Please enter your name.</div></div>
      <div class="field"><label for="phone">Phone</label><input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required><div class="form-error">Please enter a contact number.</div></div>
      <div class="field full"><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" required><div class="form-error">Please enter a valid email address.</div></div>
      <div class="field full"><label for="property_address">Property address</label><input id="property_address" name="property_address" type="text" autocomplete="street-address" placeholder="Street, suburb"></div>
      <div class="field"><label for="property_size">Property size</label>
        <select id="property_size" name="property_size">
          <option value="">Select…</option>
          <option>Small (under 300 m²)</option>
          <option>Medium (300 – 700 m²)</option>
          <option>Large (700 m² – 1,500 m²)</option>
          <option>Acreage / over 1,500 m²</option>
          <option>Strata or commercial site</option>
          <option>Not sure</option>
        </select></div>
      <div class="field"><label for="service_needed">Service needed</label>
        <select id="service_needed" name="service_needed" required>
          <option value="">Select a service…</option>
          ${serviceList.map((s) => `<option>${esc(s)}</option>`).join('')}
          <option>Other</option>
        </select><div class="form-error">Please choose a service.</div></div>
      <div class="field full"><label for="job_notes">Job notes</label><textarea id="job_notes" name="job_notes" placeholder="How often, access details, anything we should know"></textarea></div>
    </div>
    <div class="form-footer">
      <button class="btn btn--lg" type="submit">Send my quote request</button>
      <small>No obligation. We’ll only use your details to reply about this job.</small>
    </div>
  </form>`;

const serviceIconSvg = (name) => icon(name);

export function header({ light = false, current = '' } = {}) {
  const navLink = (href, label, key) => `<a href="${href}" class="nav-link${current === key ? ' is-active' : ''}">${label}</a>`;
  const dropdownItems = services.map((s) => `
            <a class="dd-item" role="menuitem" href="/services/${s.slug}/">
              <span class="dd-icon">${serviceIconSvg(s.icon)}</span>
              <span class="dd-text"><strong>${esc(s.nav)}</strong><em>${esc(s.navDescriptor)}</em></span>
            </a>`).join('');
  const mobileItems = services.map((s) => `<a href="/services/${s.slug}/">${esc(s.nav)}<em>${esc(s.navDescriptor)}</em></a>`).join('');
  return `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header${light ? ' is-light' : ''}" id="top">
  <div class="nav-inner">
    <a href="/" class="brand" aria-label="${esc(business.name)} home">
      <img src="/assets/img/logo-288.webp" width="288" height="200" alt="GSL logo — ${esc(business.name)}" style="height:48px;width:auto" fetchpriority="high">
      <span class="brand__name">Greater Sydney Landscapes</span>
    </a>
    <nav class="nav-main" aria-label="Main navigation">
      ${navLink('/', 'Home', 'home')}
      <div class="nav-dropdown">
        <button class="nav-link nav-trigger${current === 'services' ? ' is-active' : ''}" aria-expanded="false" aria-controls="services-menu">Services
          <svg class="caret" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </button>
        <div class="dropdown-panel" id="services-menu" role="menu">
          <div class="dd-grid">
            <a class="dd-item dd-item--all" role="menuitem" href="/services/">
              <span class="dd-icon">${serviceIconSvg('grid')}</span>
              <span class="dd-text"><strong>All Services</strong><em>Mowing, hedging, garden care, washing & landscaping</em></span>
            </a>${dropdownItems}
          </div>
        </div>
      </div>
      ${navLink('/about/', 'About', 'about')}
      ${navLink('/areas/', 'Areas', 'areas')}
      ${navLink('/contact/', 'Contact', 'contact')}
    </nav>
    <div class="nav-actions">
      <a href="tel:${business.phoneRaw}" class="nav-phone">${icon('phone').replace('<svg', '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"')}${business.phone}</a>
      <a href="/contact/#quote" class="btn">Get a Free Quote</a>
      <button class="nav-burger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu">
  <a href="/">Home</a>
  <button class="mm-trigger" aria-expanded="false" aria-controls="mm-services">Services <svg class="caret" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
  <div class="mm-panel" id="mm-services"><div><a href="/services/">All Services<em>Everything we do, in one place</em></a>${mobileItems}</div></div>
  <a href="/about/">About</a>
  <a href="/areas/">Service Areas</a>
  <a href="/contact/">Contact</a>
  <div class="mm-cta">
    <a class="btn btn--lg" href="/contact/#quote">Get a Free Quote</a>
    <a class="btn btn--dark btn--lg" href="tel:${business.phoneRaw}">Call ${business.phone}</a>
  </div>
</div>
`;
}

export function footer() {
  return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="logo-tile" href="/" aria-label="${esc(business.name)} home"><img src="/assets/img/logo-288.webp" width="288" height="200" alt="GSL logo" loading="lazy"></a>
        <div class="name">Greater Sydney Landscapes</div>
        <address>
          ${esc(address)}<br>
          <a href="tel:${business.phoneRaw}">${business.phone}</a><br>
          <a href="mailto:${business.email}">${business.email}</a>
        </address>
        <div class="socials">
          <a href="${business.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon('facebook')}</a>
          <a href="${business.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon('instagram')}</a>
          <a href="${business.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${icon('youtube')}</a>
          <a href="${business.gmb}" target="_blank" rel="noopener" aria-label="Google Business Profile">${icon('google')}</a>
        </div>
      </div>
      <div>
        <h4>Services</h4>
        <div class="footer-links">
          ${services.map((s) => `<a href="/services/${s.slug}/">${esc(s.name)}</a>`).join('')}
          ${foldedServices.map((s) => `<a href="${s.href}">${esc(s.name)}</a>`).join('')}
        </div>
      </div>
      <div>
        <h4>Service areas</h4>
        <div class="footer-links">
          ${areas.map((a) => `<a href="/areas/#${a.slug}">${esc(a.name)}</a>`).join('')}
        </div>
      </div>
      <div>
        <h4>Hours</h4>
        <table class="hours-table" style="color:#c7d0ca">
          ${business.hoursDisplay.map(([d, h]) => `<tr><td>${d}</td><td>${h}</td></tr>`).join('')}
        </table>
        <div class="footer-links" style="margin-top:18px">
          <a href="/about/">About us</a>
          <a href="/contact/">Contact</a>
          <a href="${business.whatsapp}" target="_blank" rel="noopener">Message us on WhatsApp</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span data-year>2026</span> ${esc(business.name)}. ABN available on request. All rights reserved.</span>
      <span>Lawn mowing, garden maintenance, hedge trimming &amp; landscaping across Toongabbie, Parramatta, Blacktown, The Hills, Hornsby, Dural &amp; the Inner West.</span>
    </div>
  </div>
</footer>`;
}

/* ---------- Document shell ---------- */
export function page({ path: p, title, description, body, schema = [], light = false, current = '', preloadImage, ogImage = '/assets/img/og-image.jpg', noindex = false }) {
  const canonical = abs(p);
  const ld = [localBusinessSchema(), ...schema];
  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}">
<meta name="google-site-verification" content="${business.gscVerification}">
<meta name="theme-color" content="#121b1f">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(business.name)}">
<meta property="og:locale" content="en_AU">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${abs(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${abs(ogImage)}">
<meta name="geo.region" content="AU-NSW">
<meta name="geo.placename" content="${business.suburb}">
<meta name="geo.position" content="${business.geo.lat};${business.geo.lng}">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/assets/img/icon-192.png" type="image/png" sizes="192x192">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/montserrat-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
${preloadImage ? imgPreload(preloadImage) : ''}
<link rel="stylesheet" href="/assets/css/main.css?v=${CSS_V}">
${ld.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
<script src="https://link.msgsndr.com/js/external-tracking.js" data-tracking-id="${business.ghlTrackingId}"> </script>
</head>
<body>
${header({ light, current })}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/js/main.js?v=${JS_V}" defer></script>
</body>
</html>`;
}
