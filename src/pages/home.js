import { business, address, areas, services, foldedServices, home } from '../data/site.js';
import { page, img, esc, faqBlock, faqSchema, quoteForm, ctaBand, abs, routeMapFigure, reviewWidget } from '../lib/layout.js';
import { icon } from '../lib/icons.js';

const strokeIcon = (name) => icon(name).replace('<svg', '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"');

const serviceCard = (s, i) => `
  <a class="service-card reveal" data-d="${(i % 3) + 1}" href="/services/${s.slug}/">
    <div class="service-card__media">
      ${img(s.image, { alt: s.cardAlt, sizes: '(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw' })}
      <span class="service-card__icon">${icon(s.icon)}</span>
    </div>
    <div class="service-card__body">
      <h3>${esc(s.cardHeading)}</h3>
      <p>${esc(s.card)}</p>
      <span class="link-arrow">Learn more ${icon('arrow')}</span>
    </div>
  </a>`;

const cardAlts = {
  'lawn-mowing': 'Lawn mowing in Blacktown and Toongabbie — freshly cut backyard lawn by Greater Sydney Landscapes',
  'garden-maintenance': 'Strata garden maintenance in Sydney — trimmed hedges and lawns at an apartment complex',
  'hedge-trimming': 'Hedge trimming in The Hills — Greater Sydney Landscapes crew shaping a front boundary hedge',
  'lawn-care': 'Lawn care in Sydney — watering in a freshly treated lawn after fertilising',
  'landscaping': 'Landscaping in Parramatta — commercial entry garden with climbing greenery and sandstone',
  'pressure-washing': 'Pressure washing Sydney — driveway half cleaned showing the difference high pressure washing makes',
};
const cardHeadings = {
  'lawn-mowing': 'Lawn Mowing Blacktown & Western Sydney',
  'garden-maintenance': 'Garden Maintenance Sydney',
  'hedge-trimming': 'Hedge Trimming Sydney',
  'lawn-care': 'Lawn Care, Fertilising & Weed Spraying',
  'pressure-washing': 'Pressure Washing Sydney',
  'landscaping': 'Landscaping Parramatta & The Hills',
};

export function render({ generated }) {
  const svc = services.map((s) => ({
    ...s,
    cardAlt: cardAlts[s.slug],
    cardHeading: cardHeadings[s.slug],
  }));

  const body = `
<section class="hero" aria-labelledby="hero-heading">
  <div class="hero__media">
    ${img('hero-lawn-hedge', { alt: 'Professional lawn mowing Sydney — freshly mown lawn and clipped formal hedge by Greater Sydney Landscapes', sizes: '100vw', loading: 'eager', fetchpriority: 'high' })}
  </div>
  <div class="hero__scrim"></div>
  <svg class="hero__grain" aria-hidden="true"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#grain)"/></svg>
  <div class="hero__swoosh" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="container">
    <div class="hero__content">
      <div class="eyebrow fadeup" style="color:var(--lime)">Based in Toongabbie · Servicing Greater Sydney</div>
      <h1 id="hero-heading" class="fadeup" data-d="1">Professional Lawn Mowing in Sydney — <em>Toongabbie, Parramatta &amp; The Hills</em></h1>
      <p class="hero__lede fadeup" data-d="2">Regular lawn mowing, hedge trimming, garden maintenance and pressure washing for homes, strata and commercial properties across Western Sydney. One local crew, a schedule you can rely on, and a fixed price before we start.</p>
      <div class="btn-group fadeup" data-d="3">
        <a class="btn btn--lg" href="#quote">Get a Free Quote</a>
        <a class="btn btn--ghost btn--lg" href="tel:${business.phoneRaw}">${strokeIcon('phone')} <span class="hide-xs">Call&nbsp;</span>${business.phone}</a>
      </div>
      <ul class="hero__trust fadeup" data-d="4">
        <li>${strokeIcon('shield')} Fully insured</li>
        <li>${strokeIcon('calendar')} Fortnightly &amp; monthly rounds</li>
        <li>${strokeIcon('pin')} Local team, Toongabbie based</li>
        <li>${strokeIcon('check')} Fixed-price quotes</li>
      </ul>
    </div>
  </div>
</section>

<div class="marquee" aria-hidden="true">
  <div class="marquee__track">
    ${[...services.map((s) => s.name), ...foldedServices.map((s) => s.name)].map((n) => `<span class="marquee__item"><i></i>${esc(n)}</span>`).join('')}
    ${areas.map((a) => `<span class="marquee__item is-area"><i></i>${esc(a.name)}</span>`).join('')}
  </div>
</div>

<section class="section" aria-labelledby="intro-heading">
  <div class="container statement">
    <div class="reveal">
      <div class="eyebrow">Lawn mowing &amp; garden care, done properly</div>
      <h2 id="intro-heading">Lawn mowing in Sydney that turns up, every time</h2>
      <span class="stripe"></span>
      <p class="lede">Greater Sydney Landscapes provides fortnightly and monthly lawn mowing across Toongabbie, Parramatta, Blacktown and The Hills from our base in ${esc(business.suburb)}. We also trim hedges, maintain gardens for homes and strata blocks, fertilise and weed-spray lawns, pressure wash driveways and take on landscaping projects.</p>
      <p>If you have ever waited around for a lawn mowing service in Sydney that never showed, you know why we built the business the way we did. You get a set schedule, a text before we arrive, a crew that does the edges and blows the paths every visit, and one invoice. No chasing, no surprises, no mess left behind.</p>
      <ul class="checks" style="margin-top:18px">
        <li>Local crew based in Toongabbie, not a call centre</li>
        <li>Fully insured for residential, strata and commercial work</li>
        <li>Ride-on mowing for acreage in Dural, Kenthurst and The Hills</li>
        <li>Green waste removed on every visit</li>
      </ul>
    </div>
    <div class="statement__aside reveal" data-d="2">
      ${img('lawn-mowing', { alt: 'Lawn mowing Sydney — push mower on a freshly cut backyard lawn in Western Sydney', sizes: '(max-width: 900px) 100vw, 45vw' })}
      <div class="statement__card">
        <strong>7 regions</strong>
        <span>Toongabbie, Parramatta, Blacktown, The Hills, Hornsby, Dural &amp; the Inner West</span>
      </div>
    </div>
  </div>
</section>

<section class="section section--off angle-top" id="services" aria-labelledby="services-heading">
  <div class="container">
    <div style="max-width:720px" class="reveal">
      <div class="eyebrow">Our services</div>
      <h2 id="services-heading">Everything your lawn and garden needs, from one local crew</h2>
      <span class="stripe"></span>
      <p class="lede">Six core services, each with its own page so you can see exactly what is included. Weed spraying and fertilising sit under lawn care; ride-on mowing is part of our lawn mowing service.</p>
    </div>
    <div class="grid grid--3" style="margin-top:40px">
      ${svc.map(serviceCard).join('')}
    </div>
    <div class="grid grid--3" style="margin-top:24px">
      ${foldedServices.map((s, i) => `
      <a class="service-card service-card--mini reveal" data-d="${i + 1}" href="${s.href}">
        <span class="service-card__icon">${icon(s.icon)}</span>
        <div><h3>${esc(s.name)}</h3><p>${esc(s.card)}</p></div>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="section section--dark angle-top angle-bottom" id="about" aria-labelledby="why-heading">
  <div class="container why">
    <div class="why__media reveal">
      <span class="swoosh" aria-hidden="true"><i></i><i></i><i></i></span>
      ${img('hedge-trimming', { alt: 'Greater Sydney Landscapes hedge trimming a front garden in The Hills — reliable lawn and garden care', sizes: '(max-width: 900px) 100vw, 40vw' })}
    </div>
    <div>
      <div class="eyebrow reveal">Why Greater Sydney Landscapes</div>
      <h2 id="why-heading" class="reveal" data-d="1">The lawn mowing service Western Sydney homeowners stop having to think about</h2>
      <span class="stripe reveal" data-d="1"></span>
      <div class="grid grid--2 reveal" data-d="2" style="margin-top:28px">
        <div class="feature"><div class="feature__icon">${strokeIcon('calendar')}</div><div><h3>A schedule, not a maybe</h3><p>Fortnightly, three-weekly or monthly. We lock in your round and text before every visit.</p></div></div>
        <div class="feature"><div class="feature__icon">${strokeIcon('user')}</div><div><h3>Same crew, every time</h3><p>The people who quote your property are the people who turn up. No strangers, no guesswork.</p></div></div>
        <div class="feature"><div class="feature__icon">${strokeIcon('shield')}</div><div><h3>Fully insured</h3><p>Public liability cover for residential, strata and commercial sites, with paperwork on request.</p></div></div>
        <div class="feature"><div class="feature__icon">${strokeIcon('truck')}</div><div><h3>Equipped for any block</h3><p>Push and ride-on mowers, pole hedgers and pressure washers, so one visit covers the whole property.</p></div></div>
        <div class="feature"><div class="feature__icon">${strokeIcon('leaf')}</div><div><h3>Sustainable where it counts</h3><p>Green waste mulched or composted, water-wise planting and no more product on your lawn than it needs.</p></div></div>
        <div class="feature"><div class="feature__icon">${strokeIcon('check')}</div><div><h3>Finished means finished</h3><p>Edges done, paths blown, gates closed, clippings gone. That is the standard on every job.</p></div></div>
      </div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="process-heading">
  <div class="container">
    <div style="max-width:680px;margin-inline:auto;text-align:center" class="reveal">
      <div class="eyebrow">How it works</div>
      <h2 id="process-heading">Three steps to a tidy property</h2>
      <span class="stripe stripe--center"></span>
    </div>
    <div class="steps" style="margin-top:40px">
      <div class="step reveal" data-d="1"><div class="step__num">01</div><h3>Tell us what you need</h3><p>Send the address, a photo if you have one, and which services you are after. Takes a minute on the quote form or a quick call.</p></div>
      <div class="step reveal" data-d="2"><div class="step__num">02</div><h3>Get a fixed price</h3><p>We quote from the details or a quick site visit and confirm a schedule that suits you. No hourly surprises.</p></div>
      <div class="step reveal" data-d="3"><div class="step__num">03</div><h3>We turn up and keep turning up</h3><p>You get a text before each visit, a tidy property afterwards and one simple invoice. Change the schedule any time.</p></div>
    </div>
  </div>
</section>

<section class="section section--off" id="gallery" aria-labelledby="gallery-heading">
  <div class="container">
    <div style="max-width:700px" class="reveal">
      <div class="eyebrow">Recent work</div>
      <h2 id="gallery-heading">Real jobs across Western Sydney</h2>
      <span class="stripe"></span>
      <p class="lede">Every photo here is one of ours: lawns, hedges, strata grounds and gardens around Toongabbie, Parramatta, Blacktown and The Hills.</p>
    </div>
    <div class="mosaic reveal" data-d="1" style="margin-top:36px">
      <figure class="wide tall">${img('strata-grounds', { alt: 'Strata garden maintenance Sydney — clipped hedges and lawns at an apartment complex maintained by Greater Sydney Landscapes', sizes: '(max-width: 900px) 100vw, 50vw' })}<figcaption>Strata grounds maintenance</figcaption></figure>
      <figure>${img('topiary', { alt: 'Hedge trimming Sydney — neatly clipped topiary ball in a front garden', sizes: '(max-width: 900px) 50vw, 25vw' })}<figcaption>Topiary shaping</figcaption></figure>
      <figure>${img('ride-on-driveway', { alt: 'Ride-on mowing Dural and The Hills — zero-turn ride-on mower ready for an acreage lawn', sizes: '(max-width: 900px) 50vw, 25vw' })}<figcaption>Ride-on mowing for larger blocks</figcaption></figure>
      <figure class="tall">${img('lawn-stripes', { alt: 'Lawn mowing Parramatta — striped, freshly mown lawn alongside a trimmed hedge', sizes: '(max-width: 900px) 50vw, 25vw' })}<figcaption>Fortnightly mowing round</figcaption></figure>
      <figure>${img('hedge-house', { alt: 'Hedge trimming Hornsby — trimming a hedge beside a heritage iron fence', sizes: '(max-width: 900px) 50vw, 25vw' })}<figcaption>Front hedge trim</figcaption></figure>
      <figure class="wide">${img('garden-lawn-dog', { alt: 'Garden maintenance Toongabbie — tidy lawn, hedge and garden bed on a sunny day', sizes: '(max-width: 900px) 100vw, 50vw' })}<figcaption>Garden maintenance visit</figcaption></figure>
      <figure>${img('cala-sign-garden', { alt: 'Landscaping Parramatta — stone feature wall with new planting at a commercial entry', sizes: '(max-width: 900px) 50vw, 25vw' })}<figcaption>Commercial planting</figcaption></figure>
    </div>
  </div>
</section>

<section class="section section--dark areas angle-top angle-bottom" id="areas" aria-labelledby="areas-heading">
  <div class="areas__ghost" aria-hidden="true">SYDNEY</div>
  <div class="container">
    <div style="max-width:720px" class="reveal">
      <div class="eyebrow">Where we work</div>
      <h2 id="areas-heading">Lawn mowing and garden services across Greater Sydney</h2>
      <span class="stripe"></span>
      <p class="lede">We are based in ${esc(address)} and run regular rounds through Toongabbie, Parramatta, Blacktown, The Hills, Hornsby, Dural and the Inner West. Not sure if we cover your street? Ask, we probably do.</p>
    </div>
    <div class="areas__layout">
      <div class="reveal" data-d="1">${routeMapFigure()}</div>
      <div class="area-grid reveal" data-d="2">
        ${areas.map((a) => `<a class="area-chip${a.home ? ' is-home' : ''}" href="/areas/#${a.slug}"><strong>${esc(a.name)}</strong><span>${esc(a.blurb.split('.')[0])}.</span></a>`).join('')}
      </div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="proof-heading">
  <div class="container proof">
    <div class="proof__card reveal">
      <div class="stars" aria-hidden="true">${icon('star').repeat(5)}</div>
      <h3 id="proof-heading">See what our customers say on Google</h3>
      <p style="color:var(--ink-2)">We would rather you read real reviews than anything we write about ourselves. Our Google Business Profile has the latest feedback from customers across Toongabbie, Parramatta and The Hills.</p>
      <a class="btn btn--dark" href="${business.gmb}" target="_blank" rel="noopener">Read our Google reviews</a>
    </div>
    <div class="reveal" data-d="2">
      <div class="eyebrow">Straightforward, local, reliable</div>
      <h2>Lawn mowing services Sydney homeowners recommend to their neighbours</h2>
      <span class="stripe"></span>
      <p>Most of our new customers in Blacktown, Toongabbie and Parramatta come from the house next door. That only happens when the lawn looks good every time and the crew is easy to deal with. If you would like to be one of them, we would love to hear from you.</p>
      <div class="badge-row" style="margin-top:14px">
        <span class="badge">${strokeIcon('check')} Residential</span>
        <span class="badge">${strokeIcon('check')} Strata &amp; body corporate</span>
        <span class="badge">${strokeIcon('check')} Commercial grounds</span>
        <span class="badge">${strokeIcon('check')} Acreage &amp; rural-residential</span>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="review-widget reveal" id="reviews">${reviewWidget()}</div>
  </div>
</section>

<section class="section section--off" id="faq" aria-labelledby="faq-heading">
  <div class="container">
    <div style="max-width:680px;margin-inline:auto;text-align:center" class="reveal">
      <div class="eyebrow">Questions we get asked</div>
      <h2 id="faq-heading">Lawn mowing &amp; garden care FAQs</h2>
      <span class="stripe stripe--center"></span>
    </div>
    <div class="reveal" data-d="1" style="margin-top:28px">${faqBlock(home.faqs)}</div>
  </div>
</section>

<section class="section" id="contact" aria-labelledby="contact-heading">
  <div class="container contact">
    <div class="reveal">
      <div class="eyebrow">Get in touch</div>
      <h2 id="contact-heading">Get a free lawn mowing quote in Sydney today</h2>
      <span class="stripe"></span>
      <p class="lede">Call, message or send the form. We reply the same business day and can usually fit a first visit in within the week.</p>
      <div class="contact__info" style="margin-top:28px">
        <div class="info-row"><div class="ico">${strokeIcon('phone')}</div><div><strong>Phone</strong><a href="tel:${business.phoneRaw}">${business.phone}</a></div></div>
        <div class="info-row"><div class="ico">${strokeIcon('message')}</div><div><strong>WhatsApp</strong><a href="${business.whatsapp}" target="_blank" rel="noopener">Message us on WhatsApp</a></div></div>
        <div class="info-row"><div class="ico">${strokeIcon('mail')}</div><div><strong>Email</strong><a href="mailto:${business.email}">${business.email}</a></div></div>
        <div class="info-row"><div class="ico">${strokeIcon('pin')}</div><div><strong>Based in</strong><a href="${business.gmb}" target="_blank" rel="noopener">${esc(address)}</a></div></div>
        <div class="info-row"><div class="ico">${strokeIcon('clock')}</div><div><strong>Hours</strong><table class="hours-table">${business.hoursDisplay.map(([d, h]) => `<tr><td>${d}</td><td>${h}</td></tr>`).join('')}</table></div></div>
      </div>
    </div>
    <div class="reveal" data-d="2">${quoteForm()}</div>
  </div>
</section>
${ctaBand({ heading: 'Need a quote for lawn mowing in Sydney this week?', sub: 'Send us the address and we will come back with a fixed price and the next available slot on our round.' })}
`;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${business.url}/#website`,
      url: business.url + '/',
      name: business.name,
      publisher: { '@id': `${business.url}/#business` },
      inLanguage: 'en-AU',
    },
    faqSchema(home.faqs),
  ];

  return page({
    path: '/',
    title: home.title,
    description: home.description,
    body,
    schema,
    current: 'home',
    preloadImage: 'hero-lawn-hedge',
  });
}
