/* =========================================================
   KVG portfolio — interactions
   ========================================================= */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage blocked */ } }
  };
  const PROJECTS = window.PROJECTS || [];

  /* ---------------- Loader ---------------- */
  (function loader() {
    const num = $('#loader-num');
    const label = $('[data-loader-label]');
    const labels = ['Initializing event horizon', 'Bending light', 'Calibrating accretion disk', 'Crossing the horizon'];
    const start = performance.now();
    const minTime = reduce ? 200 : 1700;
    let loaded = document.readyState === 'complete';
    addEventListener('load', () => (loaded = true));
    function tick(now) {
      const t = Math.min(1, (now - start) / minTime);
      const target = loaded ? t : Math.min(t, 0.9);
      const pct = Math.round((1 - Math.pow(1 - target, 3)) * 100);
      num.textContent = String(pct).padStart(3, '0');
      label.textContent = labels[Math.min(labels.length - 1, Math.floor(target * labels.length))];
      if (target >= 1) return finish();
      requestAnimationFrame(tick);
    }
    function finish() {
      document.body.classList.add('loaded');
      document.body.classList.remove('is-loading');
      if (window.VOID) window.VOID.pulse = 1;
      scramble($('.eyebrow'));
      runCounters();
    }
    // never hang on a slow asset
    setTimeout(() => (loaded = true), 4000);
    requestAnimationFrame(tick);
  })();

  /* ---------------- Text effects ---------------- */
  const GLYPHS = '!<>-_\\/[]{}—=+*^?#01ΔΣΩλ';
  function scramble(el, duration = 1100) {
    if (!el || reduce) return;
    const final = el.dataset.final || el.textContent;
    el.dataset.final = final;
    const start = performance.now();
    function step(now) {
      const p = Math.min(1, (now - start) / duration);
      const reveal = Math.floor(p * final.length);
      let out = '';
      for (let i = 0; i < final.length; i++) {
        if (i < reveal || final[i] === ' ') out += final[i];
        else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // split hero title into characters for the "spaghettification" entrance
  $$('[data-split]').forEach((line) => {
    const text = line.textContent;
    line.textContent = '';
    line.setAttribute('aria-hidden', 'true');
    [...text].forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'char';
      s.style.setProperty('--i', i + (line.classList.contains('accent') ? 6 : 0));
      s.textContent = ch === ' ' ? ' ' : ch;
      line.appendChild(s);
    });
  });
  // keep the gradient continuous across the accent line's letters
  function paintAccent() {
    $$('.hero-title .line.accent').forEach((line) => {
      const w = line.scrollWidth;
      $$('.char', line).forEach((c) => {
        c.style.backgroundSize = w + 'px 100%';
        c.style.backgroundPosition = -c.offsetLeft + 'px 0';
      });
    });
  }
  document.fonts && document.fonts.ready.then(paintAccent);
  addEventListener('resize', paintAccent);
  paintAccent();

  /* ---------------- Counters ---------------- */
  function runCounters() {
    $$('[data-count]').forEach((el) => {
      const end = +el.dataset.count;
      if (reduce) { el.textContent = end; return; }
      const start = performance.now();
      const dur = 1400;
      (function step(now) {
        const p = Math.min(1, (now - start) / dur);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(step);
      })(start);
    });
  }

  /* ---------------- Clock (Sri Lanka time) ---------------- */
  const clock = $('#clock');
  const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const tickClock = () => { if (clock) clock.textContent = fmt.format(new Date()); };
  tickClock(); setInterval(tickClock, 1000);
  $('#year').textContent = new Date().getFullYear();

  /* ---------------- Projects grid ---------------- */
  const grid = $('#projects-grid');
  const pad = (n) => String(n).padStart(2, '0');
  PROJECTS.forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'card reveal' + (i < 2 ? ' feature' : '');
    card.dataset.cat = p.category;
    card.dataset.id = p.id;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'Open case study: ' + p.card);
    card.style.setProperty('--d', (i % 3) * 0.08 + 's');
    card.innerHTML = `
      <div class="card-thumb">
        <span class="card-num">Project ${pad(i + 1)} · ${p.year}</span>
        <img src="${p.gallery[0][0]}" alt="" loading="lazy" decoding="async" />
      </div>
      <div class="card-body">
        <h3>${p.card}</h3>
        <p>${p.summary}</p>
        <div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
        <span class="card-link">Case study <i>→</i></span>
      </div>`;
    grid.appendChild(card);
  });

  // filters
  $$('.chip').forEach((chip) => chip.addEventListener('click', () => {
    $$('.chip').forEach((c) => { c.classList.toggle('active', c === chip); c.setAttribute('aria-selected', c === chip); });
    const f = chip.dataset.filter;
    $$('.card', grid).forEach((card) => {
      const show = f === 'all' || card.dataset.cat === f;
      card.classList.toggle('hidden-by-filter', !show);
      if (show) { card.classList.remove('in'); requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('in'))); }
    });
    if (window.VOID) window.VOID.pulse = 0.5;
  }));

  // tilt + light follow
  if (fine && !reduce) {
    grid.addEventListener('pointermove', (e) => {
      const card = e.target.closest('.card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', x * 100 + '%');
      card.style.setProperty('--my', y * 100 + '%');
      card.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 6}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-4px)`;
    });
    grid.addEventListener('pointerout', (e) => {
      const card = e.target.closest('.card');
      if (card && !card.contains(e.relatedTarget)) card.style.transform = '';
    });
  }

  /* ---------------- Case study modal ---------------- */
  const caseEl = $('#case');
  const caseContent = $('#case-content');
  const caseScroll = $('#case-scroll');
  let current = -1, lastFocus = null;

  function renderCase(i) {
    const p = PROJECTS[i];
    const next = PROJECTS[(i + 1) % PROJECTS.length];
    const [heroSrc, heroCap] = p.gallery[0];
    caseContent.innerHTML = `
      <div class="case-meta">// Project ${pad(i + 1)} · ${p.client} · ${p.year}</div>
      <h1 id="case-title">${p.title}</h1>
      <p class="case-tagline">${p.tagline}</p>
      ${p.links.length ? `<div class="case-links">${p.links.map(([l, u], k) => `<a class="btn-mini${k === 0 ? ' solid' : ''}" href="${u}" target="_blank" rel="noopener">${l} ↗</a>`).join('')}</div>` : ''}
      <figure class="case-hero-img" data-g="0"><img src="${heroSrc}" alt="${heroCap}" /></figure>
      <div class="case-facts">${p.facts.map(([k, v]) => `<div class="case-fact"><div class="k">${k}</div><div class="v">${v}</div></div>`).join('')}</div>
      <section class="case-sec">
        <div><div class="case-label">// 01 — Overview</div><h2>What it does.</h2></div>
        <div class="case-prose">${p.overview.map((t) => `<p>${t}</p>`).join('')}</div>
      </section>
      <section class="case-sec">
        <div><div class="case-label">// 02 — Stack</div><h2>Built with.</h2></div>
        <div class="case-stack">${p.stack.map((t) => `<span>${t}</span>`).join('')}</div>
      </section>
      <section class="case-sec">
        <div><div class="case-label">// 03 — Highlights</div><h2>Key features.</h2></div>
        <div class="case-features">${p.features.map(([h, t], k) => `<div class="case-feature"><div class="num">${pad(k + 1)}</div><h3>${h}</h3><p>${t}</p></div>`).join('')}</div>
      </section>
      <section class="case-gallery-wrap">
        <div class="case-label">// 04 — Gallery</div>
        <h2>${p.galleryTitle}</h2>
        <div class="case-gallery">${p.gallery.map(([src, cap, size], k) => `
          <figure class="g-item ${size}" data-g="${k}" tabindex="0" role="button" aria-label="View ${cap.replace(/"/g, '')}">
            <img src="${src}" alt="${cap}" loading="lazy" decoding="async" />
            <figcaption>${cap}</figcaption>
          </figure>`).join('')}</div>
      </section>
      <div class="case-end">
        <button class="btn-mini" data-close>← Back to portfolio</button>
        <a class="case-next" href="#work/${next.id}" data-next><small>Next project</small><b>${next.card} →</b></a>
      </div>`;
    caseScroll.scrollTop = 0;
  }

  function openCase(i, origin) {
    if (i < 0 || i >= PROJECTS.length) return;
    const wasOpen = !caseEl.hidden;
    current = i;
    if (!wasOpen) {
      lastFocus = document.activeElement;
      if (origin) {
        caseEl.style.setProperty('--cx', origin.x + 'px');
        caseEl.style.setProperty('--cy', origin.y + 'px');
      } else {
        caseEl.style.setProperty('--cx', '50%');
        caseEl.style.setProperty('--cy', '50%');
      }
      renderCase(i);
      caseEl.hidden = false;
      document.body.classList.add('lock');
      void caseEl.offsetWidth; // commit the closed state so the horizon transition runs
      caseEl.classList.add('open');
      setTimeout(() => window.VOID && window.VOID.pause(), 900);
      setTimeout(() => $('.case-back', caseEl).focus({ preventScroll: true }), 500);
    } else {
      caseEl.classList.add('swap');
      setTimeout(() => { renderCase(i); caseEl.classList.remove('swap'); }, 320);
    }
    const hash = '#work/' + PROJECTS[i].id;
    if (location.hash !== hash) history.pushState({ case: PROJECTS[i].id }, '', hash);
  }

  function closeCase(fromPop) {
    if (caseEl.hidden) return;
    caseEl.classList.remove('open');
    window.VOID && window.VOID.resume();
    document.body.classList.remove('lock');
    setTimeout(() => { caseEl.hidden = true; caseContent.innerHTML = ''; }, 800);
    if (!fromPop && location.hash.startsWith('#work/')) history.pushState({}, '', '#work');
    if (lastFocus) lastFocus.focus({ preventScroll: true });
    current = -1;
  }

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    openCase(PROJECTS.findIndex((p) => p.id === card.dataset.id), { x: e.clientX, y: e.clientY });
  });
  grid.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('card')) {
      e.preventDefault();
      const r = e.target.getBoundingClientRect();
      openCase(PROJECTS.findIndex((p) => p.id === e.target.dataset.id), { x: r.left + r.width / 2, y: r.top + r.height / 2 });
    }
  });
  caseEl.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) return closeCase();
    const nx = e.target.closest('[data-next]');
    if (nx) { e.preventDefault(); return openCase((current + 1) % PROJECTS.length); }
    const g = e.target.closest('[data-g]');
    if (g) openLightbox(+g.dataset.g);
  });
  caseEl.addEventListener('keydown', (e) => {
    const g = e.target.closest('.g-item');
    if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openLightbox(+g.dataset.g); }
  });
  $('#case-prev').addEventListener('click', () => openCase((current - 1 + PROJECTS.length) % PROJECTS.length));
  $('#case-next').addEventListener('click', () => openCase((current + 1) % PROJECTS.length));

  function routeFromHash(fromPop) {
    const m = location.hash.match(/^#work\/([\w-]+)/);
    if (m) {
      const i = PROJECTS.findIndex((p) => p.id === m[1]);
      if (i > -1 && i !== current) openCase(i);
    } else closeCase(fromPop);
  }
  addEventListener('popstate', () => routeFromHash(true));
  if (/^#work\//.test(location.hash)) setTimeout(() => routeFromHash(true), reduce ? 300 : 1900);

  /* ---------------- Lightbox ---------------- */
  const lb = $('#lightbox'), lbImg = $('#lb-img'), lbCap = $('#lb-cap');
  let lbIndex = 0;
  function showLb(i) {
    const g = PROJECTS[current].gallery;
    lbIndex = (i + g.length) % g.length;
    lbImg.src = g[lbIndex][0];
    lbImg.alt = g[lbIndex][1].replace(/&amp;/g, '&');
    lbCap.innerHTML = `${g[lbIndex][1]} · ${lbIndex + 1} / ${g.length}`;
  }
  function openLightbox(i) {
    showLb(i);
    lb.hidden = false;
    void lb.offsetWidth;
    lb.classList.add('open');
    $('.lb-close', lb).focus({ preventScroll: true });
  }
  function closeLightbox() {
    lb.classList.remove('open');
    setTimeout(() => (lb.hidden = true), 300);
  }
  lb.addEventListener('click', (e) => {
    if (e.target.closest('.lb-prev')) return showLb(lbIndex - 1);
    if (e.target.closest('.lb-next')) return showLb(lbIndex + 1);
    if (e.target === lb || e.target.closest('[data-lb-close]')) closeLightbox();
  });
  // swipe
  let sx = null;
  lb.addEventListener('touchstart', (e) => (sx = e.touches[0].clientX), { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) showLb(lbIndex + (dx < 0 ? 1 : -1));
    sx = null;
  });

  document.addEventListener('keydown', (e) => {
    if (!lb.hidden) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showLb(lbIndex + 1);
      if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
      return;
    }
    if (!caseEl.hidden) {
      if (e.key === 'Escape') closeCase();
      if (e.key === 'ArrowRight' && !/INPUT|TEXTAREA/.test(e.target.tagName)) openCase((current + 1) % PROJECTS.length);
      if (e.key === 'ArrowLeft' && !/INPUT|TEXTAREA/.test(e.target.tagName)) openCase((current - 1 + PROJECTS.length) % PROJECTS.length);
      if (e.key === 'Tab') trapFocus(e, caseEl);
      return;
    }
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) toggleMenu(false);
  });
  function trapFocus(e, root) {
    const f = $$('a[href], button:not([disabled]), [tabindex="0"]', root).filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------------- Reveal on scroll ---------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        if (en.target.matches('.section-num')) scramble(en.target, 700);
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach((el) => io.observe(el));

  /* ---------------- Orbit labels ---------------- */
  $$('.orbit').forEach((orbit) => {
    const spans = $$('span', orbit);
    spans.forEach((s, i) => {
      const a = (i / spans.length) * Math.PI * 2 + (orbit.classList.contains('o2') ? 0.5 : 0);
      s.style.left = 50 + Math.cos(a) * 50 + '%';
      s.style.top = 50 + Math.sin(a) * 50 + '%';
    });
  });

  /* ---------------- Header, nav, HUD ---------------- */
  const header = $('header');
  const sections = $$('[data-section]');
  const navLinks = $$('#nav a');
  const dots = $('#hud-dots');
  sections.forEach((s) => {
    const a = document.createElement('a');
    a.href = '#' + s.id;
    a.dataset.label = s.dataset.section;
    a.setAttribute('aria-label', s.dataset.section);
    dots.appendChild(a);
  });
  const dotLinks = $$('a', dots);
  const fill = $('#hud-fill'), val = $('#hud-val');
  const root = document.documentElement;
  let lastY = scrollY, ticking = false;

  function onScroll() {
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? y / max : 0;
    header.classList.toggle('scrolled', y > 40);
    header.classList.toggle('hide', y > lastY && y > 400 && !document.body.classList.contains('menu-open'));
    lastY = y;
    fill.style.transform = `scaleY(${p})`;
    // depth readout: from 12 r_s far away down to the horizon (1.00 r_s)
    val.innerHTML = (12 - p * 11).toFixed(2) + ' r<sub>s</sub>';
    root.style.setProperty('--veil', Math.min(1, y / innerHeight).toFixed(3));

    let active = sections[0];
    sections.forEach((s) => { if (s.getBoundingClientRect().top < innerHeight * 0.45) active = s; });
    navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + active.id ||
      (active.id === 'work' && a.getAttribute('href') === '#work')));
    dotLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + active.id));
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // mobile menu
  const menuBtn = $('#menu-btn');
  function toggleMenu(open) {
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuBtn.addEventListener('click', () => toggleMenu(!document.body.classList.contains('menu-open')));
  navLinks.forEach((a) => a.addEventListener('click', () => toggleMenu(false)));

  /* ---------------- Cursor + magnetic ---------------- */
  if (fine && !reduce) {
    document.documentElement.classList.add('has-cursor');
    const cur = $('#cursor'), dot = $('.c-dot', cur), ring = $('.c-ring', cur);
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`; }, { passive: true });
    addEventListener('pointerdown', () => cur.classList.add('down'));
    addEventListener('pointerup', () => cur.classList.remove('down'));
    document.addEventListener('pointerover', (e) => cur.classList.toggle('hover', !!e.target.closest('a, button, .card, .g-item, [data-magnetic]')));
    (function follow() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(follow);
    })();

    $$('[data-magnetic]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * 0.22}px, ${y * 0.3}px)`;
      });
      el.addEventListener('pointerleave', () => (el.style.transform = ''));
    });
  }

  /* ---------------- Copy email ---------------- */
  const toast = $('#toast');
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => toast.classList.remove('show'), 2000);
  }
  $('#copy-mail').addEventListener('click', async (e) => {
    const v = e.currentTarget.dataset.copy;
    // clipboard API can hang or be blocked (insecure origin, no focus): time-box it,
    // then fall back to a hidden textarea + execCommand, and only then to mailto
    const viaApi = () => Promise.race([
      navigator.clipboard ? navigator.clipboard.writeText(v) : Promise.reject(),
      new Promise((_, rej) => setTimeout(rej, 800))
    ]);
    const viaTextarea = () => {
      const ta = document.createElement('textarea');
      ta.value = v; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
      document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, v.length);
      const ok = document.execCommand && document.execCommand('copy');
      ta.remove();
      if (!ok) throw new Error('copy failed');
    };
    try { await viaApi(); showToast('Email copied'); }
    catch {
      try { viaTextarea(); showToast('Email copied'); }
      catch { location.href = 'mailto:' + v; }
    }
  });

  /* ---------------- Ambient audio ---------------- */
  const audio = $('#bg-audio'), aBtn = $('#audio-btn');
  // Time-boxed fade: iOS ignores writes to audio.volume, so never wait on it.
  let fadeTimer;
  function fade(from, to, ms, done) {
    clearInterval(fadeTimer);
    const start = performance.now();
    try { audio.volume = from; } catch { /* read-only on iOS */ }
    fadeTimer = setInterval(() => {
      const p = Math.min(1, (performance.now() - start) / ms);
      try { audio.volume = from + (to - from) * p; } catch { /* read-only on iOS */ }
      if (p >= 1) { clearInterval(fadeTimer); done && done(); }
    }, 30);
  }
  function syncAudioBtn() {
    const on = !audio.paused;
    aBtn.classList.toggle('on', on);
    aBtn.setAttribute('aria-pressed', on);
    aBtn.setAttribute('aria-label', on ? 'Mute ambient sound' : 'Play ambient sound');
  }
  audio.addEventListener('play', () => { if (!wantOn) audio.pause(); else syncAudioBtn(); });
  // the OS can pause us too (calls, other media): keep the button honest
  audio.addEventListener('pause', () => { wantOn = false; syncAudioBtn(); });
  let wantOn = false, stopTimer;
  aBtn.addEventListener('click', () => {
    wantOn = !wantOn;
    clearTimeout(stopTimer);
    if (wantOn) {
      aBtn.classList.add('on');
      audio.play().then(() => fade(0, 0.45, 900)).catch(() => { wantOn = false; syncAudioBtn(); });
    } else {
      aBtn.classList.remove('on');
      fade(audio.volume, 0, 350, () => { if (!wantOn) audio.pause(); });
      // belt and braces: pause even if the fade never finishes
      stopTimer = setTimeout(() => { if (!wantOn && !audio.paused) audio.pause(); }, 450);
    }
  });

  /* ---------------- CV viewer (pdf.js, loaded on demand) ---------------- */
  const cvViewer = $('#cv-viewer');
  const PDF_URL = 'assets/cv.pdf';
  const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
  const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  let pdfDoc = null, cvPage = 1, rendering = false;

  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = rej; s.crossOrigin = 'anonymous';
      document.head.appendChild(s);
    });
  }
  async function initCV() {
    try {
      await loadScript(PDFJS);
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
      pdfDoc = await window.pdfjsLib.getDocument(PDF_URL).promise;
      $('#cv-total').textContent = pdfDoc.numPages;
      $('#cv-pages').textContent = pdfDoc.numPages;
      await renderCV(1);
      $('#cv-loading').classList.add('done');
    } catch (err) {
      console.warn('CV preview unavailable', err);
      cvViewer.classList.add('failed');
    }
  }
  let queuedPage = null, targetPage = 1;
  async function renderCV(n) {
    if (!pdfDoc) return;
    n = Math.max(1, Math.min(pdfDoc.numPages, n));
    targetPage = n;
    // a page is already being drawn: remember the latest request and run it next
    if (rendering) { queuedPage = n; return; }
    rendering = true;
    // give pdf.js the main thread while it rasterises the page
    window.VOID && window.VOID.pause();
    const canvas = $('#cv-canvas');
    try {
      cvPage = n;
      $('#cv-page').textContent = cvPage;
      canvas.classList.remove('ready');
      const page = await pdfDoc.getPage(cvPage);
      const stage = $('.cv-stage');
      const avail = Math.min(stage.clientWidth - 32, document.fullscreenElement ? 1100 : 900);
      const base = page.getViewport({ scale: 1 });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vp = page.getViewport({ scale: (avail / base.width) * dpr });
      canvas.width = vp.width; canvas.height = vp.height;
      canvas.style.width = vp.width / dpr + 'px';
      await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
      void canvas.offsetWidth;
      canvas.classList.add('ready');
    } catch (err) {
      console.warn('CV page render failed', err);
    } finally {
      rendering = false;
      $('#cv-prev').disabled = cvPage <= 1;
      $('#cv-next').disabled = cvPage >= pdfDoc.numPages;
      if (caseEl.hidden) window.VOID && window.VOID.resume();
      if (queuedPage !== null) { const q = queuedPage; queuedPage = null; renderCV(q); }
    }
  }
  // step from the page the visitor asked for, even mid-render
  $('#cv-prev').addEventListener('click', () => renderCV(targetPage - 1));
  $('#cv-next').addEventListener('click', () => renderCV(targetPage + 1));
  $('#cv-full').addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (cvViewer.requestFullscreen) cvViewer.requestFullscreen().catch(() => window.open(PDF_URL, '_blank'));
    else window.open(PDF_URL, '_blank');
  });
  document.addEventListener('fullscreenchange', () => setTimeout(() => renderCV(targetPage), 120));
  // phones fire "resize" whenever the address bar slides; only redraw on a real width change
  let rT, lastW = innerWidth;
  addEventListener('resize', () => {
    if (innerWidth === lastW) return;
    lastW = innerWidth;
    clearTimeout(rT); rT = setTimeout(() => pdfDoc && renderCV(targetPage), 250);
  });
  const cvIO = new IntersectionObserver((en) => {
    if (en[0].isIntersecting) { cvIO.disconnect(); initCV(); }
  }, { rootMargin: '600px 0px' });
  cvIO.observe(cvViewer);
})();
