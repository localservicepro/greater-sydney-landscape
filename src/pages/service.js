import { business, address, areas, services, foldedServices } from '../data/site.js';
import { page, img, esc, faqBlock, faqSchema, serviceSchema, breadcrumbSchema, ctaBand, routeMap } from '../lib/layout.js';
import { icon } from '../lib/icons.js';

const strokeIcon = (name) => icon(name).replace('<svg', '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"');

// Per-service photography: hero + two in-body images, with service/suburb-tied alt text.
const media = {
  'lawn-mowing': {
    hero: { key: 'lawn-mowing', alt: 'Lawn mowing Blacktown — freshly cut backyard lawn with mower by Greater Sydney Landscapes' },
    pair: [
      { key: 'lawn-stripes', alt: 'Regular lawn mowing in Toongabbie — striped lawn edged along a hedge' },
      { key: 'ride-on-lawn', alt: 'Ride-on mowing for large blocks in The Hills and Dural' },
    ],
  },
  'garden-maintenance': {
    hero: { key: 'strata-grounds', alt: 'Garden maintenance Sydney — strata apartment grounds with clipped hedges and lawns' },
    pair: [
      { key: 'garden-lawn-dog', alt: 'Residential garden maintenance in Parramatta — lawn, hedge and tidy garden bed' },
      { key: 'commercial-entry', alt: 'Commercial grounds maintenance in Western Sydney — climbing greenery at a building entry' },
    ],
  },
  'hedge-trimming': {
    hero: { key: 'hero-lawn-hedge', alt: 'Hedge trimming Sydney — formal hedge clipped straight and level beside a manicured lawn in The Hills', position: 'center 55%' },
    pair: [
      { key: 'hedge-trimming', alt: 'Greater Sydney Landscapes crew member trimming a front boundary hedge in The Hills' },
      { key: 'hedge-house', alt: 'Hedge trimming beside a heritage fence in Parramatta' },
    ],
  },
  'lawn-care': {
    hero: { key: 'lawn-stripes', alt: 'Lawn care Sydney — thick, weed-free striped lawn in Toongabbie after fertilising and weed spraying', position: 'center 58%' },
    pair: [
      { key: 'lawn-care-watering', alt: 'Watering in a freshly fertilised lawn in Western Sydney' },
      { key: 'garden-lawn-dog', alt: 'Thick green lawn and garden bed after a lawn care program' },
    ],
  },
  'pressure-washing': {
    hero: { key: 'pressure-washing', alt: 'Pressure washing Sydney — exposed-aggregate driveway half cleaned, showing the difference high pressure washing makes (AI-generated placeholder until a job photo is supplied)' },
    pair: [
      { key: 'ride-on-driveway', alt: 'Clean exposed-aggregate driveway in The Hills alongside a freshly mown lawn' },
      { key: 'commercial-entry', alt: 'Sandstone paving and entry area at a commercial site in Western Sydney' },
    ],
  },
  'landscaping': {
    hero: { key: 'commercial-entry', alt: 'Landscaping Parramatta — commercial entry garden with climbing greenery and sandstone paving' },
    pair: [
      { key: 'cala-sign-garden', alt: 'Landscaping project in Western Sydney — stone feature wall with new planting' },
      { key: 'hero-lawn-hedge', alt: 'New lawn and formal hedge installed in The Hills' },
    ],
  },
};

export function renderService(s, { generated }) {
  const m = media[s.slug];
  const heroImg = img(m.hero.key, { alt: m.hero.alt, sizes: '100vw', loading: 'eager', fetchpriority: 'high', style: m.hero.position ? `object-position:${m.hero.position}` : '' });
  const related = s.related.map((slug) => services.find((x) => x.slug === slug));
  const folded = foldedServices.filter((f) => f.parent === s.slug);

  const body = `
<section class="hero hero--sub" aria-labelledby="page-heading">
  <div class="hero__media">${heroImg}</div>
  <div class="hero__scrim"></div>
  <div class="hero__swoosh" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="container">
    <div class="hero__content">
      <ol class="breadcrumb fadeup"><li><a href="/">Home</a></li><li><a href="/services/">Services</a></li><li aria-current="page">${esc(s.name)}</li></ol>
      <h1 id="page-heading" class="fadeup" data-d="1">${esc(s.h1)}</h1>
      <p class="hero__lede fadeup" data-d="2">${esc(s.short)}</p>
      <div class="btn-group fadeup" data-d="3">
        <a class="btn btn--lg" href="/contact/#quote">Get a Free Quote</a>
        <a class="btn btn--ghost btn--lg" href="tel:${business.phoneRaw}">${strokeIcon('phone')} ${business.phone}</a>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container service-layout">
    <article class="prose">
      <p class="lede reveal">${esc(s.intro)}</p>
      ${s.sections.map((sec, i) => `
      <div class="reveal"${sec.id ? ` id="${sec.id}"` : ''}>
        <h2>${esc(sec.heading)}</h2>
        <span class="stripe"></span>
        <p>${esc(sec.body)}</p>
      </div>
      ${i === 0 ? `<div class="two-up reveal">${m.pair.map((p) => img(p.key, { alt: p.alt, sizes: '(max-width: 560px) 100vw, 30vw' })).join('')}</div>` : ''}`).join('')}
      ${folded.map((f) => `<div class="reveal" id="${f.href.split('#')[1]}"><h2>${esc(f.name)}</h2><span class="stripe"></span><p>${esc(f.card)} ${f.parent === 'lawn-care' ? 'It is included in our lawn care program or available on its own.' : 'Ask about it when you request your lawn mowing quote.'}</p></div>`).join('')}
      <div class="reveal">
        <h2>What’s included</h2>
        <span class="stripe"></span>
        <ul class="checks">${s.includes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      </div>
      <div class="reveal" style="margin-top:40px">
        <h2>${esc(s.name)} FAQs</h2>
        <span class="stripe"></span>
        ${faqBlock(s.faqs)}
      </div>
    </article>
    <aside class="sidebar">
      <div class="side-card side-card--dark reveal">
        <h3>Get a fixed price for ${esc(s.name.toLowerCase())}</h3>
        <p style="color:#b9c3bd;font-size:.95rem">Send the address and a photo. We reply within one business day with a price and the next available slot.</p>
        <a class="btn" href="/contact/#quote">Request a quote</a>
        <a class="btn btn--white" href="tel:${business.phoneRaw}">Call ${business.phone}</a>
      </div>
      <div class="side-card reveal" data-d="1">
        <h3>All services</h3>
        <div class="side-list">
          ${services.map((x) => `<a href="/services/${x.slug}/"${x.slug === s.slug ? ' class="is-current" aria-current="page"' : ''}>${esc(x.name)} ${icon('arrow')}</a>`).join('')}
        </div>
      </div>
      <div class="side-card reveal" data-d="2">
        <h3>Greater Sydney Landscapes</h3>
        <div class="contact__info">
          <div class="info-row"><div class="ico">${strokeIcon('pin')}</div><div><strong>Address</strong>${esc(address)}</div></div>
          <div class="info-row"><div class="ico">${strokeIcon('mail')}</div><div><strong>Email</strong><a href="mailto:${business.email}">${business.email}</a></div></div>
          <div class="info-row"><div class="ico">${strokeIcon('clock')}</div><div><strong>Hours</strong>Mon–Fri 7am–5pm, Sat 7am–2pm</div></div>
        </div>
      </div>
    </aside>
  </div>
</section>

${routeMap(s)}

<section class="section section--off angle-top" aria-labelledby="related-heading">
  <div class="container">
    <div class="eyebrow reveal">Often booked together</div>
    <h2 id="related-heading" class="reveal">Related services</h2>
    <span class="stripe reveal"></span>
    <div class="grid grid--3" style="margin-top:32px">
      ${related.map((r, i) => `
      <a class="service-card reveal" data-d="${i + 1}" href="/services/${r.slug}/">
        <div class="service-card__media">
          ${img(media[r.slug].hero.key, { alt: media[r.slug].hero.alt, sizes: '(max-width: 640px) 100vw, 33vw' })}
          <span class="service-card__icon">${icon(r.icon)}</span>
        </div>
        <div class="service-card__body"><h3>${esc(r.name)}</h3><p>${esc(r.card)}</p><span class="link-arrow">Learn more ${icon('arrow')}</span></div>
      </a>`).join('')}
      <a class="service-card reveal" data-d="3" href="/services/">
        <div class="service-card__media" style="display:grid;place-items:center;background:var(--charcoal)"><span class="swoosh" aria-hidden="true" style="transform:scale(2.4)"><i></i><i></i><i></i></span></div>
        <div class="service-card__body"><h3>All services</h3><p>Lawn mowing, hedge trimming, garden maintenance, lawn care, pressure washing and landscaping.</p><span class="link-arrow">View all ${icon('arrow')}</span></div>
      </a>
    </div>
  </div>
</section>
${ctaBand({ heading: `Book ${s.name.toLowerCase()} in ${s.slug === 'lawn-mowing' ? 'Blacktown' : s.slug === 'landscaping' ? 'Parramatta' : 'Sydney'} today`, sub: 'Free, fixed-price quotes. Same-week availability on most rounds.' })}
`;

  return page({
    path: `/services/${s.slug}/`,
    title: s.title,
    description: s.description,
    body,
    schema: [serviceSchema(s), faqSchema(s.faqs), breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: s.name, path: `/services/${s.slug}/` }])],
    current: 'services',
    preloadImage: m.hero.key,
  });
}

export function renderServicesIndex({ generated }) {
  const body = `
<section class="hero hero--sub" aria-labelledby="page-heading">
  <div class="hero__media">${img('ute-and-mower', { alt: 'Greater Sydney Landscapes crew ute and ride-on mower on site in Western Sydney', sizes: '100vw', loading: 'eager', fetchpriority: 'high' })}</div>
  <div class="hero__scrim"></div>
  <div class="hero__swoosh" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="container">
    <div class="hero__content">
      <ol class="breadcrumb fadeup"><li><a href="/">Home</a></li><li aria-current="page">Services</li></ol>
      <h1 id="page-heading" class="fadeup" data-d="1">Lawn Mowing, Garden &amp; Property Services in Sydney</h1>
      <p class="hero__lede fadeup" data-d="2">Eight services, one local crew. Everything from a fortnightly mow in Toongabbie to a full garden makeover in The Hills, with a fixed price up front.</p>
      <div class="btn-group fadeup" data-d="3"><a class="btn btn--lg" href="/contact/#quote">Get a Free Quote</a></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="grid grid--3">
      ${services.map((s, i) => `
      <a class="service-card reveal" data-d="${(i % 3) + 1}" href="/services/${s.slug}/">
        <div class="service-card__media">
          ${img(media[s.slug].hero.key, { alt: media[s.slug].hero.alt, sizes: '(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw' })}
          <span class="service-card__icon">${icon(s.icon)}</span>
        </div>
        <div class="service-card__body"><h2 style="font-size:1.3rem;margin-bottom:8px">${esc(s.name)}</h2><p>${esc(s.card)}</p><span class="link-arrow">Learn more ${icon('arrow')}</span></div>
      </a>`).join('')}
    </div>
    <div class="grid grid--3" style="margin-top:24px">
      ${foldedServices.map((f, i) => `
      <a class="service-card service-card--mini reveal" data-d="${i + 1}" href="${f.href}">
        <span class="service-card__icon">${icon(f.icon)}</span>
        <div><h2 style="font-size:1.05rem;margin-bottom:4px">${esc(f.name)}</h2><p>${esc(f.card)}</p></div>
      </a>`).join('')}
    </div>
  </div>
</section>
${ctaBand()}
`;
  return page({
    path: '/services/',
    title: 'Lawn & Garden Services Sydney | Greater Sydney Landscapes',
    description: 'Lawn mowing, hedge trimming, garden maintenance, weed spraying, fertilising, pressure washing, landscaping & ride-on mowing across Western Sydney.',
    body,
    schema: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }])],
    current: 'services',
    preloadImage: 'ute-and-mower',
  });
}
