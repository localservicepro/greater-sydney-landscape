// Single source of truth for business data, services, areas and FAQ copy.
// Titles, H1s and meta descriptions come verbatim from the approved SEO research report.

export const business = {
  name: 'Greater Sydney Landscapes',
  shortName: 'GSL',
  legalName: 'Greater Sydney Landscapes',
  owner: 'Daniel Longo',
  phone: '0452 586 355',
  phoneRaw: '+61452586355',
  whatsapp: 'https://wa.me/61452586355',
  email: 'info@greatersydneylandscapes.com.au',
  suburb: 'Toongabbie',
  state: 'NSW',
  postcode: '2146',
  country: 'AU',
  geo: { lat: -33.7883, lng: 150.9517 },
  url: 'https://greatersydneylandscapes.com.au',
  gmb: 'https://share.google/NtZuEz8tixiG21wZv',
  facebook: 'https://www.facebook.com/profile.php?id=61553046714592',
  instagram: 'https://www.instagram.com/greatersydneylandscapes/',
  youtube: 'https://www.youtube.com/@GreaterSydneyLandscapes',
  gscVerification: 'fQxsf-ponBWTXXJdXBfDdAn5suhZUgOdvTtrOFo_O3o',
  ghlTrackingId: 'tk_5987fdfaee534a7aa664816fa84b7e3b',
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '17:00' },
    { days: ['Saturday'], opens: '07:00', closes: '14:00' },
  ],
  hoursDisplay: [
    ['Mon – Fri', '7:00am – 5:00pm'],
    ['Saturday', '7:00am – 2:00pm'],
    ['Sunday', 'Closed'],
  ],
};

// Public address is suburb-level only (the business runs from a private home).
export const address = `${business.suburb} ${business.state} ${business.postcode}`;

// Service areas. Toongabbie is home base; the seven below are the agreed service regions.
export const areas = [
  { name: 'Toongabbie', slug: 'toongabbie', blurb: 'Our home base. Same-week mowing and garden care across Toongabbie, Pendle Hill, Wentworthville and Girraween.', home: true },
  { name: 'Parramatta', slug: 'parramatta', blurb: 'Lawn mowing, strata garden maintenance and landscaping for homes and apartment blocks around Parramatta, Westmead and Harris Park.' },
  { name: 'Blacktown', slug: 'blacktown', blurb: 'Regular lawn mowing and ride-on mowing for larger blocks across Blacktown, Seven Hills, Kings Langley and Prospect.' },
  { name: 'The Hills', slug: 'the-hills', blurb: 'Hedge trimming, acreage mowing and garden upkeep in Baulkham Hills, Castle Hill, Kellyville and Bella Vista.' },
  { name: 'Hornsby', slug: 'hornsby', blurb: 'Established gardens, formal hedges and leafy blocks around Hornsby, Thornleigh, Normanhurst and Wahroonga.' },
  { name: 'Dural', slug: 'dural', blurb: 'Ride-on and acreage mowing, paddock tidy-ups and hedge reduction for rural-residential properties in Dural, Glenorie and Kenthurst.' },
  { name: 'Inner West', slug: 'inner-west', blurb: 'Compact gardens, pressure washing and tidy-ups across Strathfield, Burwood, Ashfield, Marrickville and Leichhardt.' },
  { name: 'Sydney', slug: 'sydney', blurb: 'Larger landscaping projects and commercial grounds maintenance across the wider Sydney metro by arrangement.' },
];

export const areaNames = areas.map((a) => a.name);

// The eight services the business offers. Six have their own page; two (weed spraying, fertilising) are
// folded into Lawn Care and ride-on mowing lives on the Lawn Mowing page, per the keyword research.
export const services = [
  {
    slug: 'lawn-mowing',
    name: 'Lawn Mowing',
    nav: 'Lawn Mowing',
    navDescriptor: 'Blacktown, Toongabbie & Western Sydney',
    icon: 'mower',
    h1: 'Lawn Mowing Blacktown & Western Sydney — Regular, Reliable, Insured',
    title: 'Lawn Mowing Blacktown | Greater Sydney Landscapes',
    description: 'Reliable lawn mowing in Blacktown, Toongabbie, Parramatta & The Hills. Fortnightly or monthly cuts, edges, clean-up and ride-on mowing. Free quote.',
    keyword: 'lawn mowing blacktown',
    short: 'Fortnightly or monthly cuts with edges trimmed, paths blown and clippings removed. Ride-on mowing for larger blocks.',
    card: 'Regular, reliable cuts across Blacktown, Toongabbie and Parramatta. Edges, blowing and green waste included.',
    image: 'lawn-mowing',
    includes: [
      'Fortnightly, three-weekly or monthly schedules',
      'Edging along paths, driveways and garden beds',
      'Whipper-snipping around fences and trees',
      'Paths and driveways blown clean after every cut',
      'Clippings removed or mulched, your choice',
      'Ride-on mowing for blocks over 800 m²',
    ],
    related: ['lawn-care', 'garden-maintenance'],
    intro: `Looking for lawn mowing in Blacktown that actually turns up? Greater Sydney Landscapes runs regular mowing rounds across Blacktown, Toongabbie, Seven Hills, Parramatta and The Hills from our base in Toongabbie. You pick the schedule, we keep to it, and your lawn stays cut, edged and tidy without you having to chase anyone.`,
    sections: [
      {
        heading: 'Regular lawn mowing services in Blacktown and surrounds',
        body: `Most of our Blacktown lawn mowing customers are on a fortnightly round through spring and summer, dropping back to three-weekly or monthly in the cooler months when growth slows. Every visit includes the mow, the edges along paths and garden beds, whipper-snipping around fences and posts, and a blow-down of the hard surfaces so you are not walking clippings into the house. We bring our own equipment and fuel, and we take the green waste with us unless you would rather keep it for mulch.`,
      },
      {
        heading: 'Ride-on mowing for larger blocks and acreage',
        id: 'ride-on',
        body: `Got a big backyard, a corner block or acreage out towards Dural, Kenthurst or The Hills? We run ride-on mowers for properties over about 800 square metres, which means the job is done in a fraction of the time and priced accordingly. Ride-on mowing suits paddocks, nature strips, strata common areas, church grounds and sports fields as well as rural-residential blocks. We finish the edges and tight corners with a push mower and whipper-snipper so the whole property looks the same, not just the open ground.`,
      },
      {
        heading: 'Why Blacktown and Western Sydney homeowners choose us',
        body: `We are a small local crew, so the people who quote your lawn are the people who mow it. We are fully insured, we text before we arrive, and we send one simple invoice at the end of each visit or each month, whichever you prefer. If the lawn is looking tired, we can add fertilising and weed spraying from our lawn care service so it is green again, not just short.`,
      },
    ],
    faqs: [
      { q: 'How often should I have my lawn mowed in Blacktown?', a: 'Fortnightly through spring and summer keeps most Sydney lawns healthy and tidy. In autumn and winter three-weekly or monthly is usually enough. We will suggest a schedule when we quote and adjust it through the year.' },
      { q: 'Do you take the grass clippings away?', a: 'Yes. Green waste removal is included in our lawn mowing price. If you would prefer to keep clippings for your compost or mulch, just let us know.' },
      { q: 'Do you mow nature strips and front verges?', a: 'We do. Most customers have us mow the nature strip as part of the regular visit so the whole frontage looks the same.' },
      { q: 'Can you mow a large block or acreage?', a: 'Yes. We run ride-on mowers for blocks over roughly 800 square metres, including acreage properties in Dural, The Hills and Hornsby. We finish edges and tight spots with a push mower.' },
    ],
  },
  {
    slug: 'garden-maintenance',
    name: 'Garden Maintenance',
    nav: 'Garden Maintenance',
    navDescriptor: 'Homes, strata & commercial across Sydney',
    icon: 'leaf',
    h1: 'Garden Maintenance Sydney — Regular Upkeep for Homes, Strata & Commercial',
    title: 'Garden Maintenance Sydney | Greater Sydney Landscapes',
    description: 'Regular garden maintenance in Sydney for homes, strata & commercial grounds. Pruning, weeding, mulching & tidy-ups across Parramatta & Western Sydney.',
    keyword: 'garden maintenance sydney',
    short: 'Scheduled garden upkeep: pruning, weeding, mulching, bed tidy-ups and green waste removal for homes, strata and commercial grounds.',
    card: 'Scheduled pruning, weeding, mulching and tidy-ups for homes, strata blocks and commercial grounds.',
    image: 'strata-grounds',
    includes: [
      'Pruning and shaping shrubs and small trees',
      'Weeding garden beds and paved areas',
      'Mulching and bed top-ups',
      'Seasonal tidy-ups and leaf removal',
      'Strata and commercial grounds on a fixed schedule',
      'All green waste removed',
    ],
    related: ['hedge-trimming', 'lawn-mowing'],
    intro: `Garden maintenance in Sydney is easy to get quoted and hard to get done well. Greater Sydney Landscapes looks after gardens on a regular schedule for homeowners, strata committees and commercial property managers across Parramatta, The Hills, Blacktown and the Inner West, so the grounds look cared for every week of the year, not just the week before an inspection.`,
    sections: [
      {
        heading: 'Residential garden maintenance that keeps up with Sydney growth',
        body: `Sydney gardens grow fast. Left for a season, beds fill with weeds, shrubs lose their shape and mulch disappears. Our regular garden maintenance service in Sydney covers pruning, weeding, mulching, edging and a general tidy-up on a fortnightly or monthly visit, with hedge trimming and lawn mowing bundled in if you want one crew handling the whole property. We work with what you have planted, keep natives and established trees healthy, and take every bit of green waste away.`,
      },
      {
        heading: 'Strata garden maintenance in Parramatta and Western Sydney',
        body: `Strata managers and body corporates need grounds that look consistent and a contractor who turns up without reminders. We maintain common-area gardens, nature strips, entry plantings and lawns for apartment blocks and townhouse complexes around Parramatta, Westmead, Blacktown and The Hills on a fixed schedule with a single monthly invoice. Pressure washing of common paths and driveways can be added to the same contract.`,
      },
      {
        heading: 'Commercial grounds maintenance',
        body: `Offices, medical centres, childcare centres, churches and retail sites across Western Sydney use us for scheduled grounds maintenance. We keep frontages presentable, paths and car parks clear of weeds and leaf litter, and garden beds mulched and tidy. We are fully insured and happy to work to a site induction or specific access hours.`,
      },
    ],
    faqs: [
      { q: 'Can you handle regular garden maintenance for strata blocks in Parramatta?', a: 'Yes. We maintain common-area gardens, lawns and nature strips for strata and townhouse complexes around Parramatta, Westmead and Blacktown on a fixed fortnightly or monthly schedule with one monthly invoice.' },
      { q: 'What is included in a garden maintenance visit?', a: 'A typical visit covers pruning and shaping, weeding beds and paved areas, edging, a general tidy-up and green waste removal. Mulching, hedge trimming, lawn mowing and fertilising can be added to the same visit.' },
      { q: 'How often do gardens in Sydney need maintenance?', a: 'Most established gardens stay in good shape on a monthly visit, with fortnightly visits through spring and summer when growth is fastest. We will recommend a schedule when we see the garden.' },
      { q: 'Do you do one-off garden clean-ups?', a: 'We do. If a garden has got away from you, we can do a one-off tidy-up and then move you onto a regular schedule so it never gets to that point again.' },
    ],
  },
  {
    slug: 'hedge-trimming',
    name: 'Hedge Trimming',
    nav: 'Hedge Trimming',
    navDescriptor: 'The Hills, Hornsby & Dural',
    icon: 'hedge',
    h1: 'Hedge Trimming Sydney — Shaping, Height Reduction & Formal Hedges',
    title: 'Hedge Trimming Sydney | Greater Sydney Landscapes',
    description: 'Hedge trimming Sydney: shaping, height reduction & formal hedges across The Hills, Hornsby, Dural & Parramatta. Clean lines, clippings removed. Free quote.',
    keyword: 'hedge trimming sydney',
    short: 'Straight, level hedges and tidy screens. Shaping, height reduction, formal hedging and clean-up.',
    card: 'Straight lines, level tops and tidy screens. Shaping, height reduction and formal hedges across The Hills and Hornsby.',
    image: 'hedge-trimming',
    includes: [
      'Formal hedge shaping with string lines and levels',
      'Height reduction on overgrown screens',
      'Lilly pilly, murraya, photinia, viburnum and buxus',
      'Side trimming along fences and driveways',
      'Boundary screens and privacy hedges',
      'All clippings removed from site',
    ],
    related: ['garden-maintenance', 'lawn-mowing'],
    intro: `A good hedge is the first thing people notice about a property, and a bad one is the first thing they remember. Greater Sydney Landscapes provides hedge trimming in Sydney for homeowners in The Hills, Hornsby, Dural, Parramatta and the Inner West, from a quick tidy of a lilly pilly screen to bringing an overgrown boundary hedge back to a manageable height.`,
    sections: [
      {
        heading: 'Formal hedge trimming and shaping',
        body: `Formal hedges only look right when the top is level and the faces are straight. We set string lines, work from the top down, and shape buxus, murraya, viburnum and photinia hedges so they read as one clean line from the street. Regular trimming two to four times a year keeps the hedge dense and stops it getting woody in the middle.`,
      },
      {
        heading: 'Height reduction for overgrown hedges and screens',
        body: `Lilly pilly and leighton green screens in The Hills and Hornsby can put on a metre a year. If yours has crept past the fence line or is shading the yard, we can reduce it in stages so it recovers well, square up the sides, and bring it back onto a maintenance schedule. We use pole hedgers and platforms for taller screens, and we take every bit of the clippings away.`,
      },
      {
        heading: 'Hedge trimming for The Hills, Hornsby and Dural gardens',
        body: `Established gardens in Castle Hill, Baulkham Hills, Kellyville, Hornsby and Dural tend to have more hedging than the average Sydney block, so we often combine hedge trimming with garden maintenance and lawn mowing on a single visit. One crew, one invoice, and a property that looks consistently kept rather than trimmed in pieces.`,
      },
    ],
    faqs: [
      { q: 'How often should hedges be trimmed in Sydney?', a: 'Fast growers like lilly pilly and murraya look best trimmed three to four times a year. Slower formal hedges such as buxus usually need two to three trims. We can set this up as part of a regular maintenance schedule.' },
      { q: 'Can you reduce the height of a very overgrown hedge?', a: 'Yes. Most hedges can be brought down in one or two stages depending on the species and how far back we need to go. We will tell you honestly if a hedge is too far gone to recover.' },
      { q: 'Do you do hedge trimming and pressure washing in the Inner West?', a: 'We do. We service Strathfield, Burwood, Ashfield, Marrickville and surrounds for hedge trimming, garden tidy-ups and pressure washing, often on the same visit.' },
      { q: 'Do you take the hedge clippings away?', a: 'Always. Green waste removal is part of every hedge trimming job, and we blow down paths and driveways before we leave.' },
    ],
  },
  {
    slug: 'lawn-care',
    name: 'Lawn Care',
    nav: 'Lawn Care & Fertilising',
    navDescriptor: 'Weed spraying & fertilising, Sydney-wide',
    icon: 'spray',
    h1: 'Lawn Care Sydney — Fertilising, Weed Spraying & Lawn Health',
    title: 'Lawn Care Sydney | Greater Sydney Landscapes',
    description: 'Lawn care in Sydney that gets the lawn green, not just short. Fertilising, weed spraying & bindi control across Toongabbie, Parramatta & The Hills.',
    keyword: 'lawn care sydney',
    short: 'Plant and lawn fertilising, weed spraying and seasonal treatments that bring a tired lawn back to green.',
    card: 'Fertilising, weed spraying and seasonal treatments that bring a tired lawn back to life.',
    image: 'lawn-care-watering',
    includes: [
      'Slow-release lawn fertilising, spring and autumn',
      'Broadleaf and bindi weed spraying',
      'Plant and garden bed fertilising',
      'Weed control on paths, driveways and gravel',
      'Advice on watering and mowing height',
      'Bundled with regular mowing rounds',
    ],
    related: ['lawn-mowing', 'garden-maintenance'],
    intro: `Mowing keeps a lawn short. Lawn care keeps it green. Greater Sydney Landscapes offers lawn care in Sydney, including plant and lawn fertilising and weed spraying, for homeowners who want the lawn to look good, not just cut. We service Toongabbie, Parramatta, Blacktown, The Hills, Hornsby and the Inner West, usually as an add-on to a regular mowing round.`,
    sections: [
      {
        heading: 'Lawn and plant fertilising',
        body: `Sydney's buffalo, couch and kikuyu lawns respond quickly to the right fertiliser at the right time. We apply a slow-release lawn fertiliser in early spring and again in autumn, with a lighter feed through summer if the lawn is under stress. Garden beds, hedges and fruit trees get their own plant fertilising program, so the whole property greens up together rather than the lawn outgrowing the beds.`,
      },
      {
        heading: 'Weed spraying for bindis, broadleaf weeds and paths',
        body: `Bindis in spring, clover and broadleaf weeds through summer, and winter grass once the weather cools. We use selective herbicides that target the weeds and leave the lawn, timed so each treatment catches the weed before it seeds. For paths, driveways, gravel areas and fence lines we use a separate knockdown treatment to keep hard surfaces clean between visits.`,
      },
      {
        heading: 'A lawn care program that works with your mowing',
        body: `The best results come when fertilising, weed spraying and mowing are planned together. If we already mow your lawn, we will build the treatments into the round and adjust the mowing height through the year so the lawn stays thick enough to crowd out weeds on its own. If you only want the treatments, that is fine too. Either way you get a short note after each visit saying what went down and when to water.`,
      },
    ],
    faqs: [
      { q: 'When is the best time to fertilise a lawn in Sydney?', a: 'Early spring, once the soil warms, and again in early autumn. A light feed in mid-summer helps lawns under heat stress. We time applications around rain so nothing is wasted.' },
      { q: 'Is weed spraying safe for kids and pets?', a: 'We use registered selective herbicides applied by a trained operator and let you know how long to keep off the lawn, typically until the spray has dried. We will tell you the product used on every visit.' },
      { q: 'Can you get rid of bindis?', a: 'Yes. The key is treating in late winter and early spring before the bindis set seed. Two treatments a few weeks apart usually clears them for the season.' },
      { q: 'Do you fertilise garden beds and hedges too?', a: 'We do. Plant fertilising for beds, hedges, natives and fruit trees is part of the same lawn care visit if you want it.' },
    ],
  },
  {
    slug: 'pressure-washing',
    name: 'Pressure Washing',
    nav: 'Pressure Washing',
    navDescriptor: 'Driveways, paths & patios, Western Sydney',
    icon: 'wash',
    h1: 'Pressure Washing Sydney — Driveways, Paths, Patios & House Exteriors',
    title: 'Pressure Washing Sydney | Greater Sydney Landscapes',
    description: 'High pressure washing in Sydney for driveways, paths, patios & house exteriors. Pre-sale clean-ups & strata common areas across Western Sydney. Free quote.',
    keyword: 'pressure washing sydney',
    short: 'High pressure cleaning of driveways, paths, patios, pavers, retaining walls and exterior surfaces.',
    card: 'Driveways, paths, patios and pavers brought back to clean. Pre-sale clean-ups and strata common areas.',
    image: 'pressure-washing',
    includes: [
      'Concrete and exposed-aggregate driveways',
      'Pavers, patios, alfresco areas and pool surrounds',
      'Paths, steps and retaining walls',
      'Fences, rendered walls and brickwork',
      'Pre-sale and end-of-lease clean-ups',
      'Strata common areas and car parks',
    ],
    related: ['garden-maintenance', 'landscaping'],
    intro: `Years of Sydney weather leave driveways, paths and patios grey with grime, moss and mould. Greater Sydney Landscapes provides pressure washing in Sydney for homeowners, landlords and strata managers across Parramatta, Blacktown, The Hills, Toongabbie and the Inner West, bringing hard surfaces back to how they looked when they were laid.`,
    sections: [
      {
        heading: 'High pressure washing for driveways, paths and patios',
        body: `Our high pressure washing service in Sydney uses surface cleaners and commercial pressure washers that lift dirt, tyre marks, oil, moss and mould from concrete, pavers, exposed aggregate and natural stone without streaking. Driveways, front paths, pool surrounds and alfresco areas are the most common jobs, and most are done in a morning. We pre-treat moss and mould so it does not come straight back.`,
      },
      {
        heading: 'Pre-sale clean-ups and strata common areas',
        body: `A pressure-washed driveway and clean front path are the cheapest improvement you can make before a property goes to market, and agents in Western Sydney book us for exactly that. For strata and commercial sites we clean common paths, car parks, bin areas, stairwells and entry areas on a scheduled basis, often alongside our garden maintenance contract so the whole frontage is handled by one crew.`,
      },
      {
        heading: 'House exteriors, fences and retaining walls',
        body: `We also pressure wash rendered walls, brick, Colorbond and timber fences, retaining walls and outdoor furniture, adjusting the pressure for each surface so nothing is damaged. If you are planning a repaint or a new landscaping project, a pressure clean first gives you a proper surface to work from.`,
      },
    ],
    faqs: [
      { q: 'How much does pressure washing cost in Sydney?', a: 'It depends on the surface, its size and how dirty it is. We quote from a photo or a quick visit and give you a fixed price before we start. Combining the driveway, paths and patio in one visit is the most cost-effective way to do it.' },
      { q: 'Will pressure washing damage my pavers or concrete?', a: 'Not when it is done properly. We use surface cleaners rather than a bare wand on large areas, and adjust pressure for pavers, stone, render and timber. Loose sand between pavers can be re-sanded afterwards if needed.' },
      { q: 'Do you pressure wash strata common areas?', a: 'Yes. We clean common paths, driveways, car parks and bin areas for strata complexes across Parramatta, Blacktown and The Hills, on a one-off or scheduled basis.' },
      { q: 'How long does a driveway take?', a: 'A standard double driveway takes one to two hours including pre-treatment. We will give you a time estimate with the quote.' },
    ],
  },
  {
    slug: 'landscaping',
    name: 'Landscaping Projects',
    nav: 'Landscaping Projects',
    navDescriptor: 'Parramatta, Blacktown & The Hills',
    icon: 'landscape',
    h1: 'Landscaping Parramatta & Western Sydney — Design, Build & Planting',
    title: 'Landscaping Parramatta | Greater Sydney Landscapes',
    description: 'Landscaping in Parramatta & Western Sydney: garden design, new turf, garden beds, planting & makeovers for homes and new builds. Free consultation.',
    keyword: 'landscaping parramatta',
    short: 'Garden makeovers, new lawns and turf, garden beds, planting and mulching for homes, renovations and new builds.',
    card: 'Garden makeovers, new turf, garden beds and planting for renovations and new builds across Western Sydney.',
    image: 'commercial-entry',
    includes: [
      'Garden design and planting plans',
      'New lawns, turf laying and soil preparation',
      'Garden beds, edging and mulching',
      'Native and low-maintenance planting',
      'Front yard and street-appeal makeovers',
      'Ongoing maintenance once the job is finished',
    ],
    related: ['garden-maintenance', 'pressure-washing'],
    intro: `Whether you have just moved into a new build in Blacktown or The Hills with a bare block, or your Parramatta garden has simply had its day, Greater Sydney Landscapes handles landscaping in Parramatta and across Western Sydney from design through to the last barrow of mulch. And because we are a maintenance business first, we design gardens that are realistic to keep.`,
    sections: [
      {
        heading: 'Landscaping for new builds and renovations in Western Sydney',
        body: `New estates around Blacktown, Marsden Park, Kellyville and The Ponds hand over houses with a patch of dirt out the back. We turn that into a usable garden: soil preparation, new turf or a seeded lawn, garden beds with edging, planting chosen for the aspect and the amount of time you want to spend on it, and mulch to finish. For renovations we work around the builders and schedule the landscaping to land once the hard work inside is done.`,
      },
      {
        heading: 'Garden makeovers and front yard street appeal',
        body: `A lot of our Parramatta and Toongabbie landscaping work is front yards: clearing tired plantings, reshaping beds, laying new turf, planting hedges for privacy and finishing with a clean edge along the driveway. It is the fastest way to lift the look of a house, and it makes the regular mowing and hedge trimming afterwards quicker and cheaper.`,
      },
      {
        heading: 'Designed to be maintained',
        body: `Because we mow lawns and trim hedges every day, we know which plants thrive in Western Sydney clay and heat and which ones will be a problem in two years. We lean towards hardy natives, well-chosen hedging species and lawns suited to the aspect, and we can set you up with a maintenance schedule the day the project is finished so it never slides backwards.`,
      },
    ],
    faqs: [
      { q: 'Do you do landscaping for new builds in Blacktown and The Hills?', a: 'Yes. Bare-block landscaping for new builds is a large part of our project work: soil prep, turf, garden beds, planting and mulching, usually delivered in one or two stages.' },
      { q: 'Can you lay new turf?', a: 'We can. We prepare the base, supply and lay buffalo, couch or kikuyu turf depending on the site, and can follow up with fertilising and mowing once it has taken.' },
      { q: 'How long does a landscaping project take?', a: 'A front yard makeover is typically two to four days. Larger new-build gardens run one to two weeks depending on size and materials. We give you a timeline with the quote.' },
      { q: 'Do you offer maintenance after the project?', a: 'Yes, and we recommend it. We can put the new garden straight onto a mowing and maintenance schedule so it establishes properly.' },
    ],
  },
];

// Services that are folded into other pages but still need to appear by name in nav, cards and schema.
export const foldedServices = [
  { name: 'Weed Spraying', icon: 'spray', href: '/services/lawn-care/#weed-spraying', card: 'Bindis, broadleaf weeds and winter grass treated before they seed. Hard surfaces kept clean.', parent: 'lawn-care' },
  { name: 'Plant & Lawn Fertilising', icon: 'fert', href: '/services/lawn-care/#fertilising', card: 'Slow-release feeds for lawns, beds and hedges, timed for spring and autumn.', parent: 'lawn-care' },
  { name: 'Ride-On Mowing', icon: 'rideon', href: '/services/lawn-mowing/#ride-on', card: 'Big blocks, acreage, paddocks and strata grounds mown fast with ride-on equipment.', parent: 'lawn-mowing' },
];

// The eight services as listed by the client, used for the quote-form dropdown and schema offer catalogue.
export const serviceList = [
  'Lawn Mowing',
  'Hedge Trimming',
  'Garden Maintenance',
  'Weed Spraying',
  'Plant & Lawn Fertilising',
  'Pressure Washing',
  'Landscaping Projects',
  'Ride-On Mowing',
];

export const home = {
  title: 'Lawn Mowing Sydney & Garden Care | Greater Sydney Landscapes',
  description: 'Reliable lawn mowing in Sydney. Mowing, hedging, garden care & pressure washing across Toongabbie, Parramatta, Blacktown & The Hills. Get a free quote today!',
  h1: 'Professional Lawn Mowing in Sydney — Toongabbie, Parramatta & The Hills',
  keyword: 'lawn mowing sydney',
  faqs: [
    {
      q: 'How much does lawn mowing cost in Toongabbie and Western Sydney?',
      a: 'Price depends on the size of the lawn, how often it is cut and whether edging and green waste removal are included (they are, in ours). Regular customers on a fortnightly round pay less per visit than one-off cuts. Send us a photo or your address and we will give you a fixed price.',
    },
    {
      q: 'Do you offer ride-on mowing for acreage properties in Dural and The Hills?',
      a: 'Yes. We run ride-on mowers for larger blocks, acreage and paddocks across Dural, Kenthurst, Glenorie and The Hills, and finish the edges and tight corners with a push mower so the whole property looks consistent.',
    },
    {
      q: 'Can you handle regular garden maintenance for strata blocks in Parramatta?',
      a: 'We do. We look after common-area gardens, lawns and nature strips for strata and townhouse complexes in Parramatta, Westmead and Blacktown on a fixed schedule with one monthly invoice.',
    },
    {
      q: 'How often should I have my lawn mowed in Sydney?',
      a: 'Fortnightly in spring and summer, when buffalo, couch and kikuyu lawns grow fastest, and every three to four weeks through autumn and winter. We will recommend a schedule when we quote and adjust it through the year.',
    },
    {
      q: 'Do you do hedge trimming and pressure washing in the Inner West?',
      a: 'Yes. We service Strathfield, Burwood, Ashfield, Marrickville and the surrounding Inner West suburbs for hedge trimming, garden tidy-ups and pressure washing, often on the same visit.',
    },
    {
      q: 'Which areas of Sydney does Greater Sydney Landscapes service?',
      a: 'We are based in Toongabbie and service Toongabbie, Parramatta, Blacktown, The Hills, Hornsby, Dural and the Inner West, with larger landscaping projects across wider Sydney by arrangement.',
    },
  ],
};
