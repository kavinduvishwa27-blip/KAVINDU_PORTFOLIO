/* =========================================================
   THE VOID — the original black hole film from v1, brought
   to life with a particle layer drawn on top of it:
     · sparks orbiting the accretion disk (faster near the hole)
     · matter spiralling in and vanishing at the horizon
     · stars streaming outward, faster the deeper you scroll
   The film's poster shows instantly; the 4.6 MB video loads
   only after the page has finished, and never on Save-Data.
   ========================================================= */
(function () {
  const video = document.getElementById('void');
  const stage = document.getElementById('void-stage');
  const fx = document.getElementById('void-fx');
  if (!video || !stage) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  const mobile = matchMedia('(max-width: 760px), (pointer: coarse)').matches;

  /* ---------- the film ---------- */
  function startVideo() {
    if (reduce || saveData || video.dataset.started) return;
    video.dataset.started = '1';
    video.src = video.dataset.src;
    video.playbackRate = 1.35; // the disk's swirl is very slow at 1x
    video.play().catch(() => { /* autoplay blocked: the poster stays */ });
  }
  if (document.readyState === 'complete') startVideo();
  else addEventListener('load', startVideo);
  video.addEventListener('loadedmetadata', () => (video.playbackRate = 1.35));

  /* ---------- input ---------- */
  const mouse = { tx: 0, ty: 0 };
  addEventListener('pointermove', (e) => {
    mouse.tx = (e.clientX / innerWidth) * 2 - 1;
    mouse.ty = -((e.clientY / innerHeight) * 2 - 1);
  }, { passive: true });

  let scroll = 0;
  const readScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    scroll = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
  };
  addEventListener('scroll', readScroll, { passive: true });
  readScroll();

  /* ---------- particle layer ---------- */
  // Where the hole sits in the 16:9 film (measured from the frames)
  const HOLE = { x: 0.494, y: 0.372, shadow: 0.09, tilt: 7.8 * Math.PI / 180, flat: 0.13 };
  const ctx = fx && fx.getContext('2d');
  let W = 0, H = 0, dpr = 1, frame = { x: 0, y: 0, w: 0, h: 0 };

  function resize() {
    if (!fx) return;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = stage.clientWidth; H = stage.clientHeight;
    fx.width = Math.max(1, Math.round(W * dpr));
    fx.height = Math.max(1, Math.round(H * dpr));
    // same "cover" fit the video uses
    const s = Math.max(W / 16, H / 9);
    frame = { w: 16 * s, h: 9 * s, x: (W - 16 * s) / 2, y: (H - 9 * s) / 2 };
  }
  resize();
  addEventListener('resize', resize);

  // soft glow sprite, drawn once
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = 32;
  (() => {
    const g = sprite.getContext('2d');
    const rg = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    rg.addColorStop(0, 'rgba(255,255,255,1)');
    rg.addColorStop(0.25, 'rgba(255,255,255,.55)');
    rg.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = rg; g.fillRect(0, 0, 32, 32);
  })();
  // pre-tinted sprites: white-hot → gold → ember
  const tints = ['255,244,225', '255,214,150', '255,170,95', '255,120,60'].map((rgb) => {
    const c = document.createElement('canvas'); c.width = c.height = 32;
    const g = c.getContext('2d');
    g.drawImage(sprite, 0, 0);
    g.globalCompositeOperation = 'source-in';
    g.fillStyle = `rgb(${rgb})`; g.fillRect(0, 0, 32, 32);
    return c;
  });

  const rand = (a, b) => a + Math.random() * (b - a);
  const SPARKS = mobile ? 220 : 460;
  const STARS = mobile ? 70 : 150;
  const sparks = Array.from({ length: SPARKS }, () => newSpark(true));
  const stars = Array.from({ length: STARS }, () => newStar(true));

  function newSpark(anywhere) {
    const r = anywhere ? rand(0.1, 0.62) : rand(0.4, 0.62);
    return { a: rand(0, Math.PI * 2), r, sp: rand(0.55, 1.1), size: rand(0.6, 1.8), tw: rand(0, 6.28), fall: Math.random() < 0.18 };
  }
  function newStar(anywhere) {
    return { a: rand(0, Math.PI * 2), d: anywhere ? rand(0.02, 1) : rand(0.02, 0.12), sp: rand(0.5, 1.4), len: rand(0.6, 1.4) };
  }

  function drawParticles(dt, t) {
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // fade the previous frame instead of clearing: gives motion trails
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    const cx = frame.x + HOLE.x * frame.w, cy = frame.y + HOLE.y * frame.h;
    const fw = frame.w, shadowR = HOLE.shadow * fw;
    const ct = Math.cos(HOLE.tilt), st = Math.sin(HOLE.tilt);

    // stars streaming out of the centre ("falling in")
    const warp = 0.12 + scroll * 0.9;
    const diag = Math.hypot(W, H) * 0.6;
    ctx.lineCap = 'round';
    for (const s of stars) {
      const d0 = s.d;
      s.d *= 1 + dt * warp * s.sp * 1.6;
      if (s.d > 1.2) Object.assign(s, newStar(false));
      const x0 = cx + Math.cos(s.a) * d0 * diag, y0 = cy + Math.sin(s.a) * d0 * diag;
      const x1 = cx + Math.cos(s.a) * s.d * diag, y1 = cy + Math.sin(s.a) * s.d * diag;
      const alpha = Math.min(0.9, s.d * 1.1);
      ctx.strokeStyle = `rgba(235,225,255,${alpha})`;
      ctx.lineWidth = s.len * (0.4 + s.d);
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
    }

    // sparks on the disk (Keplerian: inner ones whip round faster)
    for (const p of sparks) {
      p.a += dt * p.sp * 0.55 * Math.pow(0.15 / p.r, 1.5);
      if (p.fall) p.r -= dt * 0.03 * (0.2 / p.r);
      if (p.r < 0.088) { Object.assign(p, newSpark(false)); continue; }
      const ex = Math.cos(p.a) * p.r * fw;
      const ey = Math.sin(p.a) * p.r * fw * HOLE.flat;
      const x = cx + ex * ct - ey * st;
      const y = cy + ex * st + ey * ct;
      const back = Math.sin(p.a) < 0;
      if (back && Math.hypot(x - cx, y - cy) < shadowR * 1.05) continue; // hidden behind the hole
      const heat = Math.min(3, Math.floor((p.r - 0.088) / 0.14));
      const near = 1 - Math.min(1, (p.r - 0.088) / 0.5);
      const twinkle = 0.65 + 0.35 * Math.sin(t * 3 + p.tw);
      // approaching side (left in the film) is brighter: relativistic beaming
      const beam = 0.75 + 0.45 * -Math.cos(p.a);
      ctx.globalAlpha = Math.min(1, (0.45 + near * 0.75) * twinkle * beam * (back ? 0.6 : 1));
      const sz = p.size * (3.2 + near * 6.5) * (mobile ? 0.85 : 1);
      ctx.drawImage(tints[heat], x - sz, y - sz, sz * 2, sz * 2);
    }
    ctx.globalAlpha = 1;
  }

  /* ---------- loop ---------- */
  let x = 0, y = 0, s = 1.08, paused = false, last = performance.now();
  const t0 = last;
  const api = (window.VOID = {
    pulse: 0,
    pause() { paused = true; video.pause(); },
    resume() {
      if (!paused) return;
      paused = false; last = performance.now();
      if (video.dataset.started) video.play().catch(() => {});
      requestAnimationFrame(loop);
    }
  });

  function loop(now) {
    if (paused) return;
    const dt = Math.min(0.05, Math.max(0, (now - last) / 1000)); last = now;
    const t = (now - t0) / 1000;
    const drift = 0.5 - 0.5 * Math.cos(t * (Math.PI * 2 / 40));
    const ts = 1.08 + drift * 0.16 + scroll * 0.3 + api.pulse * 0.12;
    api.pulse *= 0.95;
    x += (mouse.tx * -40 - x) * 0.05;
    y += (mouse.ty * -30 - y) * 0.05;
    s += (ts - s) * 0.05;
    const rot = Math.sin(t * 0.05) * 2.5 + scroll * 6;
    stage.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s}) rotate(${rot}deg)`;
    if (W !== stage.clientWidth || H !== stage.clientHeight) resize();
    drawParticles(dt, t);
    // self-heal: rapid pause/resume (CV redraws, modals) can abort a pending
    // play(); if the film should be running but isn't, nudge it once a second
    if (video.dataset.started && video.paused && !document.hidden && now - lastNudge > 1000) {
      lastNudge = now;
      video.play().catch(() => {});
    }
    requestAnimationFrame(loop);
  }
  let lastNudge = 0;
  if (!reduce) requestAnimationFrame(loop);

  document.addEventListener('visibilitychange', () => {
    if (!video.dataset.started || paused) return;
    if (document.hidden) video.pause();
    else video.play().catch(() => {});
  });
})();
