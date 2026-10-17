/* =========================================================
   THE VOID — the original black hole film from v1.
   The poster shows instantly; the 4.6 MB video loads only
   after the page has finished, and never on Save-Data.
   Motion: mouse parallax, a slow 60 s "falling in" pulse,
   and a deeper zoom + slight roll the further you scroll.
   ========================================================= */
(function () {
  const video = document.getElementById('void');
  if (!video) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;

  function startVideo() {
    if (reduce || saveData || video.dataset.started) return;
    video.dataset.started = '1';
    video.src = video.dataset.src;
    video.play().catch(() => { /* autoplay blocked: the poster stays */ });
  }
  if (document.readyState === 'complete') startVideo();
  else addEventListener('load', startVideo);

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
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

  let x = 0, y = 0, s = 1.08, paused = false;
  const t0 = performance.now();

  const api = (window.VOID = {
    pulse: 0,
    pause() { paused = true; video.pause(); },
    resume() {
      if (!paused) return;
      paused = false;
      if (video.dataset.started) video.play().catch(() => {});
      requestAnimationFrame(loop);
    }
  });

  function loop(now) {
    if (paused) return;
    const t = (now - t0) / 1000;
    const drift = 0.5 - 0.5 * Math.cos(t * (Math.PI * 2 / 60));
    const ts = 1.08 + drift * 0.14 + scroll * 0.28 + api.pulse * 0.12;
    api.pulse *= 0.95;
    x += (mouse.tx * -25 - x) * 0.05;
    y += (mouse.ty * -20 - y) * 0.05;
    s += (ts - s) * 0.05;
    const rot = Math.sin(t * 0.02) * 2 + scroll * 6;
    video.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s}) rotate(${rot}deg)`;
    requestAnimationFrame(loop);
  }
  if (!reduce) requestAnimationFrame(loop);
  else video.style.transform = 'scale(1.08)';

  document.addEventListener('visibilitychange', () => {
    if (!video.dataset.started || paused) return;
    if (document.hidden) video.pause();
    else video.play().catch(() => {});
  });
})();
