/* Greater Sydney Landscapes — site behaviour (no dependencies) */
(function () {
  'use strict';
  var d = document, w = window;
  var header = d.querySelector('.site-header');
  var reduceMotion = w.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header: frosted on scroll ---------- */
  function onScroll() {
    if (header) header.classList.toggle('scrolled', w.scrollY > 40);
  }
  w.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Services mega-dropdown: hover on pointer devices, click everywhere ---------- */
  var dd = d.querySelector('.nav-dropdown');
  if (dd) {
    var trigger = dd.querySelector('.nav-trigger');
    var hoverCapable = w.matchMedia('(hover: hover)').matches;
    var open = function () { dd.classList.add('open'); trigger.setAttribute('aria-expanded', 'true'); };
    var close = function () { dd.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); };
    if (hoverCapable) {
      dd.addEventListener('mouseenter', open);
      dd.addEventListener('mouseleave', close);
    }
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      dd.classList.contains('open') ? close() : open();
    });
    d.addEventListener('click', function (e) { if (!dd.contains(e.target)) close(); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ---------- Mobile menu ---------- */
  var burger = d.querySelector('.nav-burger');
  var mobile = d.querySelector('.mobile-menu');
  if (burger && mobile) {
    var setMenu = function (isOpen) {
      d.body.classList.toggle('menu-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      d.body.style.overflow = isOpen ? 'hidden' : '';
    };
    burger.addEventListener('click', function () { setMenu(!d.body.classList.contains('menu-open')); });
    mobile.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    var mmTrigger = mobile.querySelector('.mm-trigger');
    var mmPanel = mobile.querySelector('.mm-panel');
    if (mmTrigger && mmPanel) {
      mmTrigger.addEventListener('click', function () {
        var isOpen = mmPanel.classList.toggle('open');
        mmTrigger.setAttribute('aria-expanded', String(isOpen));
      });
    }
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = d.querySelectorAll('.reveal');
  if ('IntersectionObserver' in w && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Parallax on hero media + ghost watermark (rAF-throttled) ---------- */
  var heroMedia = d.querySelector('.hero__media');
  var ghost = d.querySelector('.areas__ghost');
  if (!reduceMotion && (heroMedia || ghost) && w.matchMedia('(min-width: 900px)').matches) {
    var ticking = false;
    var update = function () {
      var y = w.scrollY;
      if (heroMedia && y < w.innerHeight) heroMedia.style.transform = 'translate3d(0,' + (y * 0.25) + 'px,0)';
      if (ghost) {
        var r = ghost.parentElement.getBoundingClientRect();
        ghost.style.transform = 'translateY(calc(-50% + ' + ((r.top - w.innerHeight / 2) * -0.08) + 'px))';
      }
      ticking = false;
    };
    w.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Marquee: duplicate content once so the loop is seamless ---------- */
  d.querySelectorAll('.marquee__track').forEach(function (track) {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- FAQ: only one open at a time (nicer on mobile) ---------- */
  d.querySelectorAll('.faq').forEach(function (faq) {
    faq.querySelectorAll('details').forEach(function (det) {
      det.addEventListener('toggle', function () {
        if (det.open) faq.querySelectorAll('details[open]').forEach(function (o) { if (o !== det) o.open = false; });
      });
    });
  });

  /* ---------- Custom cursor (pointer devices only) ---------- */
  if (w.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
    var dot = d.createElement('div'), ring = d.createElement('div');
    dot.className = 'cursor-dot'; ring.className = 'cursor-ring';
    d.body.appendChild(dot); d.body.appendChild(ring);
    var mx = -100, my = -100, rx = -100, ry = -100;
    d.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)'; });
    (function loop() { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)'; requestAnimationFrame(loop); })();
    d.querySelectorAll('a, button, summary, .service-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () { d.body.classList.add('cursor-hover'); });
      el.addEventListener('mouseleave', function () { d.body.classList.remove('cursor-hover'); });
    });
  }

  /* ---------- Quote form ----------
     The GHL external-tracking script captures the submission from the DOM; we validate, let the
     tracking listener run on the same submit event, then redirect to the thank-you page. */
  var form = d.querySelector('form[data-quote-form]');
  if (form) {
    var fields = ['full_name', 'email', 'phone', 'service_needed'];
    var validate = function () {
      var ok = true;
      fields.forEach(function (name) {
        var input = form.elements[name];
        var wrap = input.closest('.field');
        var valid = input.checkValidity() && input.value.trim() !== '';
        if (name === 'phone') valid = /^[\d\s()+-]{8,}$/.test(input.value.trim());
        wrap.classList.toggle('is-invalid', !valid);
        if (!valid) ok = false;
      });
      return ok;
    };
    form.addEventListener('submit', function (e) {
      if (!validate()) { e.preventDefault(); form.querySelector('.is-invalid input, .is-invalid select').focus(); return; }
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      btn.disabled = true; btn.textContent = 'Sending…';
      try {
        sessionStorage.setItem('gsl_lead', JSON.stringify({
          name: form.elements['full_name'].value.trim().split(' ')[0],
          service: form.elements['service_needed'].value
        }));
      } catch (err) { /* storage unavailable */ }
      var go = function () { w.location.assign(form.getAttribute('data-redirect') || '/thank-you/'); };
      // Give the tracking script's own submit listener time to send its beacon.
      setTimeout(go, 700);
    });
    fields.forEach(function (name) {
      var input = form.elements[name];
      if (input) input.addEventListener('input', function () { input.closest('.field').classList.remove('is-invalid'); });
    });
  }

  /* ---------- Thank-you personalisation ---------- */
  var thanksName = d.querySelector('[data-thanks-name]');
  if (thanksName) {
    try {
      var lead = JSON.parse(sessionStorage.getItem('gsl_lead') || 'null');
      if (lead && lead.name) thanksName.textContent = 'Thanks, ' + lead.name + '.';
    } catch (err) { /* ignore */ }
  }

  /* ---------- Route map: stop the mower for reduced-motion users ---------- */
  if (reduceMotion) d.querySelectorAll('.route-map animateMotion').forEach(function (el) { el.remove(); });

  /* ---------- Current-year ---------- */
  d.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
