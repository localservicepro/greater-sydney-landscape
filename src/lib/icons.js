// Inline SVG icon set — simple stroked paths on a 24x24 viewBox. No icon fonts, no CDN.
const wrap = (paths, extra = '') => `<svg viewBox="0 0 24 24" aria-hidden="true" ${extra}>${paths}</svg>`;

export const icons = {
  grid: wrap('<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>'),
  mower: wrap('<path d="M3 15h11l2-6h4"/><path d="M14 15v3"/><circle cx="6" cy="18" r="2.5"/><circle cx="17" cy="18" r="2.5"/><path d="M3 11v4"/><path d="M16 9l2-5h3"/>'),
  rideon: wrap('<path d="M4 16h3l2-5h7l2 5h2"/><circle cx="7" cy="18" r="2.5"/><circle cx="17" cy="18" r="2.5"/><path d="M11 11V7h4l1 4"/><path d="M12 7V5h2"/>'),
  leaf: wrap('<path d="M5 19C5 10 10 5 20 4c-1 10-6 15-15 15z"/><path d="M5 19 14 10"/>'),
  hedge: wrap('<path d="M4 20h16"/><path d="M6 20V9a6 6 0 0 1 12 0v11"/><path d="M3 9h18"/><path d="M9 20v-6M15 20v-6M12 20v-9"/>'),
  spray: wrap('<path d="M9 21V9a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v12"/><path d="M8 21h8"/><path d="M12 6V3"/><path d="M18 5l2-2M17 9h3M6 5 4 3M7 9H4"/>'),
  fert: wrap('<path d="M12 21V11"/><path d="M12 11c0-4 3-6 7-6 0 4-3 6-7 6z"/><path d="M12 15c0-3-2.5-5-6-5 0 3 2.5 5 6 5z"/><path d="M5 21h14"/>'),
  wash: wrap('<path d="M4 20 9 9"/><path d="M8 7l3-3 3 3-3 3z"/><path d="M14 4l2 2"/><path d="M16 11c1 1 1.5 2 1.5 3M19 9c1.5 1.5 2.5 3.5 2.5 6M14 14c.5.5.8 1.2.8 2"/>'),
  landscape: wrap('<path d="M3 20h18"/><path d="M4 20c2-6 5-9 8-9s6 3 8 9"/><circle cx="17" cy="6" r="2.5"/><path d="M7 20c.5-3 1.5-5 3-6"/>'),
  phone: wrap('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
  mail: wrap('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  pin: wrap('<path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
  clock: wrap('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  check: wrap('<path d="m5 12 4 4L19 6"/>'),
  shield: wrap('<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>'),
  calendar: wrap('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
  user: wrap('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>'),
  truck: wrap('<path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>'),
  message: wrap('<path d="M4 5h16v11H9l-5 4z"/>'),
  arrow: wrap('<path d="M5 12h14M13 6l6 6-6 6"/>', 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'),
  plus: wrap('<path d="M12 5v14M5 12h14"/>', 'fill="none"'),
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c1.7.7 2 .6 2.7.5a2.3 2.3 0 0 0 1.5-1.1c.2-.5.2-1 .1-1.1s-.2-.1-.4-.2z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4A22 22 0 0 0 14.3 4c-2.5 0-4.1 1.5-4.1 4.3v2.5H7.5V14h2.7v8z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM21.5 12c0-1.3 0-2.6-.1-3.9a5.6 5.6 0 0 0-1.5-3.9A5.6 5.6 0 0 0 16 2.6C14.6 2.5 13.3 2.5 12 2.5s-2.6 0-3.9.1a5.6 5.6 0 0 0-3.9 1.5A5.6 5.6 0 0 0 2.6 8C2.5 9.4 2.5 10.7 2.5 12s0 2.6.1 3.9a5.6 5.6 0 0 0 1.5 3.9 5.6 5.6 0 0 0 3.9 1.6c1.3.1 2.6.1 3.9.1s2.6 0 3.9-.1a5.6 5.6 0 0 0 3.9-1.6 5.6 5.6 0 0 0 1.5-3.9c.3-1.3.3-2.6.3-3.9zm-2.2 5.6a3.4 3.4 0 0 1-2 2 10 10 0 0 1-2.5.3H9.2a10 10 0 0 1-2.5-.3 3.4 3.4 0 0 1-2-2 10 10 0 0 1-.3-2.5V9.2a10 10 0 0 1 .3-2.5 3.4 3.4 0 0 1 2-2 10 10 0 0 1 2.5-.3h5.6a10 10 0 0 1 2.5.3 3.4 3.4 0 0 1 2 2 10 10 0 0 1 .3 2.5v5.6a10 10 0 0 1-.3 2.8z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 7.2a2.9 2.9 0 0 0-2-2C19.2 4.7 12 4.7 12 4.7s-7.2 0-9 .5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 .5 12a30 30 0 0 0 .5 4.8 2.9 2.9 0 0 0 2 2c1.8.5 9 .5 9 .5s7.2 0 9-.5a2.9 2.9 0 0 0 2-2 30 30 0 0 0 .5-4.8 30 30 0 0 0-.5-4.8zM9.7 15.1V8.9l6 3.1z"/></svg>',
  google: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 12.2c0-.7-.1-1.3-.2-1.9H12v3.7h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2a9.7 9.7 0 0 0 3-7.3z"/><path d="M12 22a9.5 9.5 0 0 0 6.6-2.4l-3.2-2.5a6 6 0 0 1-9-3.2H3.1v2.6A10 10 0 0 0 12 22z"/><path d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9z"/><path d="M12 6a5.4 5.4 0 0 1 3.8 1.5l2.9-2.9A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.9 5.5l3.3 2.6A6 6 0 0 1 12 6z"/></svg>',
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 3 6.6 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21.2l1.4-7L2 9.4l7-.8z"/></svg>',
};

export const icon = (name) => icons[name] || icons.grid;
