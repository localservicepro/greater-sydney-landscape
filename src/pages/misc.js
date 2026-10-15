import { business, address, areas, services, home } from '../data/site.js';
import { page, img, esc, quoteForm, ctaBand, breadcrumbSchema } from '../lib/layout.js';
import { icon } from '../lib/icons.js';

const strokeIcon = (name) => icon(name).replace('<svg', '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"');

const subHero = ({ imgKey, alt, crumb, h1, lede }) => `
<section class="hero hero--sub" aria-labelledby="page-heading">
  <div class="hero__media">${img(imgKey, { alt, sizes: '100vw', loading: 'eager', fetchpriority: 'high' })}</div>
  <div class="hero__scrim"></div>
  <div class="hero__swoosh" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="container">
    <div class="hero__content">
      <ol class="breadcrumb fadeup"><li><a href="/">Home</a></li><li aria-current="page">${esc(crumb)}</li></ol>
      <h1 id="page-heading" class="fadeup" data-d="1">${h1}</h1>
      <p class="hero__lede fadeup" data-d="2">${esc(lede)}</p>
    </div>
  </div>
</section>`;

/* ---------- About ---------- */
export function renderAbout() {
  const body = `
${subHero({ imgKey: 'ute-and-mower', alt: 'Greater Sydney Landscapes ute and ride-on mower on a job in Western Sydney', crumb: 'About', h1: 'About Greater Sydney Landscapes', lede: 'A Toongabbie-based lawn mowing and garden maintenance crew looking after homes, strata blocks and commercial grounds across Western Sydney.' })}
<section class="section">
  <div class="container statement">
    <div class="reveal">
      <div class="eyebrow">Who we are</div>
      <h2>Local, insured and easy to deal with</h2>
      <span class="stripe"></span>
      <p class="lede">Greater Sydney Landscapes is run by ${esc(business.owner)} from ${esc(address)}. We started with lawn mowing rounds around Toongabbie, Pendle Hill and Wentworthville and grew, mostly by word of mouth, into hedge trimming, garden maintenance, lawn care, pressure washing and landscaping across Parramatta, Blacktown, The Hills, Hornsby, Dural and the Inner West.</p>
      <p>We are not a franchise and we do not subcontract. The people who quote your property are the people who turn up to do the work, with the right gear for the job, from push mowers for tight townhouse lawns to ride-on mowers for acreage out towards Dural.</p>
      <p>We hold the qualifications and insurances you would expect for residential, strata and commercial work, and we are happy to send certificates of currency to strata managers and property managers before we start.</p>
    </div>
    <div class="statement__aside reveal" data-d="2">
      ${img('hedge-trimming', { alt: 'Greater Sydney Landscapes crew trimming a hedge at a family home in The Hills', sizes: '(max-width: 900px) 100vw, 45vw' })}
      <div class="statement__card"><strong>Toongabbie</strong><span>Home base, 15 minutes from Parramatta, Blacktown and The Hills</span></div>
    </div>
  </div>
</section>
<section class="section section--dark angle-top angle-bottom">
  <div class="container">
    <div style="max-width:720px" class="reveal">
      <div class="eyebrow">How we work</div>
      <h2>What you can expect on every visit</h2>
      <span class="stripe"></span>
    </div>
    <div class="grid grid--3 reveal" data-d="1" style="margin-top:32px">
      <div class="feature"><div class="feature__icon">${strokeIcon('calendar')}</div><div><h3>Set schedule</h3><p>A fixed round, fortnightly or monthly, with a text before we arrive. Change it whenever you need to.</p></div></div>
      <div class="feature"><div class="feature__icon">${strokeIcon('check')}</div><div><h3>Finished properly</h3><p>Edges, whipper-snipping, paths blown, gates closed, green waste gone. The same standard every time.</p></div></div>
      <div class="feature"><div class="feature__icon">${strokeIcon('leaf')}</div><div><h3>Sustainable practice</h3><p>Green waste mulched or composted, water-wise plant choices and only as much product as the lawn needs.</p></div></div>
      <div class="feature"><div class="feature__icon">${strokeIcon('shield')}</div><div><h3>Insured</h3><p>Public liability cover for residential, strata and commercial sites, with paperwork on request.</p></div></div>
      <div class="feature"><div class="feature__icon">${strokeIcon('truck')}</div><div><h3>Equipped for any block</h3><p>Push and ride-on mowers, pole hedgers, sprayers and pressure washers on the truck.</p></div></div>
      <div class="feature"><div class="feature__icon">${strokeIcon('user')}</div><div><h3>One point of contact</h3><p>Call or message ${esc(business.owner.split(' ')[0])} directly. No call centre, no ticket numbers.</p></div></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="mosaic reveal">
      <figure class="wide tall">${img('strata-grounds', { alt: 'Strata grounds maintained by Greater Sydney Landscapes — hedges and lawns at a Sydney apartment complex', sizes: '(max-width: 900px) 100vw, 50vw' })}<figcaption>Strata grounds</figcaption></figure>
      <figure>${img('ride-on-leaves', { alt: 'Ride-on mower clearing leaf litter under trees on an acreage block in Dural', sizes: '25vw' })}<figcaption>Acreage tidy-up</figcaption></figure>
      <figure>${img('lawn-care-watering', { alt: 'Watering in a freshly treated lawn — lawn care in Western Sydney', sizes: '25vw' })}<figcaption>Lawn care</figcaption></figure>
      <figure class="wide">${img('hero-lawn-hedge', { alt: 'Manicured lawn and formal hedge maintained in The Hills', sizes: '(max-width: 900px) 100vw, 50vw' })}<figcaption>Formal hedge and lawn</figcaption></figure>
    </div>
  </div>
</section>
${ctaBand({ heading: 'Want a crew that treats your place like their own?' })}
`;
  return page({
    path: '/about/',
    title: 'About Us | Greater Sydney Landscapes, Toongabbie',
    description: 'Greater Sydney Landscapes is a Toongabbie-based, insured lawn mowing & garden maintenance crew servicing Parramatta, Blacktown, The Hills & the Inner West.',
    body,
    schema: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about/' }])],
    current: 'about',
    preloadImage: 'ute-and-mower',
  });
}

/* ---------- Areas ---------- */
export function renderAreas() {
  const areaImgs = {
    toongabbie: 'lawn-stripes', parramatta: 'strata-grounds', blacktown: 'lawn-mowing', 'the-hills': 'hero-lawn-hedge',
    hornsby: 'topiary', dural: 'ride-on-lawn', 'inner-west': 'hedge-house', sydney: 'commercial-entry',
  };
  const body = `
${subHero({ imgKey: 'ride-on-driveway', alt: 'Ride-on mowing across Greater Sydney — mower on a driveway in The Hills', crumb: 'Service Areas', h1: 'Lawn Mowing &amp; Garden Services Across Greater Sydney', lede: 'From our base in Toongabbie we run regular rounds through Parramatta, Blacktown, The Hills, Hornsby, Dural and the Inner West, with larger projects across the wider Sydney metro.' })}
<section class="section">
  <div class="container">
    <div style="max-width:760px" class="reveal">
      <div class="eyebrow">Where we work</div>
      <h2>Based in Toongabbie, servicing seven regions of Greater Sydney</h2>
      <span class="stripe"></span>
      <p class="lede">We keep our rounds tight so we can be reliable. Most of our lawn mowing, hedge trimming and garden maintenance customers are within 30 minutes of ${esc(address)}. If your suburb is not listed, ask: if it is on the way to one of our rounds, we can usually fit you in.</p>
    </div>
    <div class="grid grid--2" style="margin-top:40px">
      ${areas.map((a, i) => `
      <article class="service-card reveal" data-d="${(i % 2) + 1}" id="${a.slug}">
        <div class="service-card__media">${img(areaImgs[a.slug], { alt: `Lawn mowing and garden maintenance in ${a.name} by Greater Sydney Landscapes`, sizes: '(max-width: 640px) 100vw, 50vw' })}<span class="service-card__icon">${icon('pin')}</span></div>
        <div class="service-card__body">
          <h2 style="font-size:1.35rem">Lawn mowing &amp; garden care in ${esc(a.name)}${a.home ? ' <span class="badge" style="font-size:.7rem;vertical-align:middle">Home base</span>' : ''}</h2>
          <p>${esc(a.blurb)}</p>
          <div class="btn-group"><a class="btn" href="/contact/#quote">Quote for ${esc(a.name)}</a><a class="link-arrow" href="/services/lawn-mowing/">Lawn mowing ${icon('arrow')}</a></div>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>
<section class="section section--dark angle-top angle-bottom">
  <div class="container">
    <div class="grid grid--2" style="align-items:center">
      <div class="reveal">
        <div class="eyebrow">Services by area</div>
        <h2>Every service, every area</h2>
        <span class="stripe"></span>
        <p style="color:#b9c3bd">All of our services are available across all of our service areas. Ride-on and acreage mowing is most in demand in Dural, Kenthurst, Glenorie and The Hills; strata garden maintenance around Parramatta, Westmead and Blacktown; hedge trimming through The Hills, Hornsby and the Inner West.</p>
        <div class="footer-links" style="columns:2;margin-top:16px">${services.map((s) => `<a href="/services/${s.slug}/" style="color:#fff">${esc(s.name)}</a>`).join('')}</div>
      </div>
      <div class="reveal" data-d="2">
        <div class="map-embed"><iframe title="Map of Greater Sydney Landscapes, 56 Ballandella Rd Toongabbie" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen src="https://www.google.com/maps?q=${encodeURIComponent(address + ', Australia')}&output=embed"></iframe></div>
      </div>
    </div>
  </div>
</section>
${ctaBand()}
`;
  return page({
    path: '/areas/',
    title: 'Service Areas | Greater Sydney Landscapes, Toongabbie',
    description: 'We service Toongabbie, Parramatta, Blacktown, The Hills, Hornsby, Dural & the Inner West with lawn mowing, hedge trimming & garden maintenance.',
    body,
    schema: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Service Areas', path: '/areas/' }])],
    current: 'areas',
    preloadImage: 'ride-on-driveway',
  });
}

/* ---------- Contact ---------- */
export function renderContact() {
  const body = `
${subHero({ imgKey: 'hero-lawn-hedge', alt: 'Contact Greater Sydney Landscapes for lawn mowing and garden care in Sydney', crumb: 'Contact', h1: 'Contact Greater Sydney Landscapes', lede: 'Call, message or send the quote form. We reply within one business day, usually the same day, and can fit most new customers in within the week.' })}
<section class="section">
  <div class="container contact">
    <div class="reveal">
      <div class="eyebrow">Get in touch</div>
      <h2>Free quotes for lawn mowing, hedging, garden care &amp; more</h2>
      <span class="stripe"></span>
      <div class="contact__info" style="margin-top:28px">
        <div class="info-row"><div class="ico">${strokeIcon('phone')}</div><div><strong>Phone</strong><a href="tel:${business.phoneRaw}">${business.phone}</a></div></div>
        <div class="info-row"><div class="ico">${strokeIcon('message')}</div><div><strong>WhatsApp</strong><a href="${business.whatsapp}" target="_blank" rel="noopener">Message us on WhatsApp</a></div></div>
        <div class="info-row"><div class="ico">${strokeIcon('mail')}</div><div><strong>Email</strong><a href="mailto:${business.email}">${business.email}</a></div></div>
        <div class="info-row"><div class="ico">${strokeIcon('pin')}</div><div><strong>Address</strong><a href="${business.gmb}" target="_blank" rel="noopener">${esc(address)}</a></div></div>
        <div class="info-row"><div class="ico">${strokeIcon('clock')}</div><div><strong>Hours</strong><table class="hours-table">${business.hoursDisplay.map(([d, h]) => `<tr><td>${d}</td><td>${h}</td></tr>`).join('')}</table></div></div>
      </div>
      <div class="map-embed" style="margin-top:32px"><iframe title="Map of Greater Sydney Landscapes, 56 Ballandella Rd Toongabbie" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen src="https://www.google.com/maps?q=${encodeURIComponent(address + ', Australia')}&output=embed"></iframe></div>
    </div>
    <div class="reveal" data-d="2">${quoteForm()}</div>
  </div>
</section>
`;
  return page({
    path: '/contact/',
    title: 'Contact & Free Quote | Greater Sydney Landscapes',
    description: 'Get a free lawn mowing or garden maintenance quote. Call 0452 586 355, WhatsApp or send the form. 56 Ballandella Rd, Toongabbie NSW 2146.',
    body,
    schema: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }])],
    current: 'contact',
    preloadImage: 'hero-lawn-hedge',
  });
}

/* ---------- Thank you ---------- */
export function renderThankYou() {
  const body = `
<section class="thanks">
  <div class="container" style="max-width:720px">
    <div class="check fadeup">${strokeIcon('check')}</div>
    <div class="eyebrow fadeup" data-d="1" style="justify-content:center">Quote request received</div>
    <h1 class="fadeup" data-d="1" style="font-size:clamp(2rem,4vw,3rem)"><span data-thanks-name>Thanks.</span> We’ve got your request.</h1>
    <p class="lede fadeup" data-d="2">${esc(business.owner.split(' ')[0])} will look over the details and come back to you within one business day, usually sooner. If it is urgent, call us on <a href="tel:${business.phoneRaw}">${business.phone}</a>.</p>
    <div class="btn-group fadeup" data-d="3" style="justify-content:center;margin-top:24px">
      <a class="btn" href="/">Back to home</a>
      <a class="btn btn--dark" href="/services/">Browse our services</a>
    </div>
  </div>
</section>
`;
  return page({
    path: '/thank-you/',
    title: 'Thanks — Quote Request Received | Greater Sydney Landscapes',
    description: 'Your quote request has been received. Greater Sydney Landscapes will be in touch within one business day.',
    body,
    light: true,
    noindex: true,
  });
}

/* ---------- 404 ---------- */
export function renderNotFound() {
  const body = `
<section class="thanks">
  <div class="container" style="max-width:720px">
    <div class="eyebrow fadeup" style="justify-content:center">404</div>
    <h1 class="fadeup" data-d="1" style="font-size:clamp(2rem,4vw,3rem)">That page has been mowed over</h1>
    <p class="lede fadeup" data-d="2">The page you are after does not exist or has moved. Try one of these instead.</p>
    <div class="btn-group fadeup" data-d="3" style="justify-content:center;margin-top:24px">
      <a class="btn" href="/">Home</a>
      <a class="btn btn--dark" href="/services/">Services</a>
      <a class="btn btn--dark" href="/contact/">Contact</a>
    </div>
  </div>
</section>
`;
  return page({ path: '/404.html', title: 'Page Not Found | Greater Sydney Landscapes', description: 'The page you requested could not be found.', body, light: true, noindex: true });
}
