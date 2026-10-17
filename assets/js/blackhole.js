/* =========================================================
   THE VOID — a ray-marched black hole.
   Each pixel fires a light ray that bends around the hole
   (Schwarzschild-style acceleration), crosses a turbulent
   accretion disk, and finally samples a lensed starfield.
   Rendered at reduced resolution, paused when hidden.
   ========================================================= */
(function () {
  const canvas = document.getElementById('void');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gl = canvas && (canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' }) ||
                        canvas.getContext('experimental-webgl'));
  if (!gl) { document.documentElement.classList.add('no-webgl'); return; }

  const mobile = matchMedia('(max-width: 760px), (pointer: coarse)').matches;
  const STEPS = mobile ? 70 : 110;

  const vert = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

  const frag = `
  precision highp float;
  uniform vec2  uRes;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uScroll;
  uniform float uShift;
  uniform float uShiftY;
  uniform float uZoom;
  #define STEPS ${STEPS}

  float hash(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
  float noise(vec3 x){
    vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                   mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                   mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
  float fbm(vec3 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 4; i++){ v += a * noise(p); p *= 2.07; a *= 0.5; } return v; }

  vec3 sky(vec3 d){
    vec3 col = vec3(0.0);
    // two layers of point stars
    for (int l = 0; l < 2; l++){
      float sc = l == 0 ? 90.0 : 210.0;
      vec3 q = d * sc; vec3 id = floor(q); vec3 f = fract(q) - 0.5;
      float h = hash(id);
      if (h > 0.972){
        float s = max(0.0, 1.0 - length(f) * 2.2);
        float tw = 0.75 + 0.25 * sin(uTime * (1.0 + h * 3.0) + h * 40.0);
        vec3 tint = mix(vec3(1.0, 0.82, 0.62), vec3(0.72, 0.84, 1.0), fract(h * 91.0));
        col += tint * pow(s, 6.0) * (l == 0 ? 2.2 : 1.1) * tw;
      }
    }
    // faint nebula dust
    float n = fbm(d * 2.4 + vec3(0.0, 0.0, uTime * 0.004));
    col += vec3(0.20, 0.08, 0.05) * pow(n, 3.2) * 0.9;
    col += vec3(0.05, 0.06, 0.12) * pow(fbm(d * 4.0 + 7.0), 3.0) * 0.6;
    return col;
  }

  void main(){
    vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
    uv.x -= uShift;
    uv.y -= uShiftY;
    uv /= uZoom;

    // camera orbiting slightly above the disk plane
    float tilt = 0.10 + uMouse.y * 0.06 + uScroll * 0.20;
    float yaw  = uMouse.x * 0.22 + uTime * 0.015;
    float dist = 31.0;
    vec3 ro = dist * vec3(sin(yaw) * cos(tilt), sin(tilt), -cos(yaw) * cos(tilt));
    vec3 fw = normalize(-ro);
    vec3 rt = normalize(cross(vec3(0.0, 1.0, 0.0), fw));
    vec3 up = cross(fw, rt);
    // slight roll for drama
    float roll = -0.18 + uMouse.x * 0.05;
    vec3 rt2 = rt * cos(roll) + up * sin(roll);
    vec3 up2 = up * cos(roll) - rt * sin(roll);
    vec3 rd = normalize(fw * 1.75 + uv.x * rt2 + uv.y * up2);

    vec3 p = ro, v = rd;
    vec3 hv = cross(p, v); float h2 = dot(hv, hv);
    vec3 col = vec3(0.0);
    float trans = 1.0;
    float minR = 1e3;
    bool captured = false;

    for (int i = 0; i < STEPS; i++){
      float r = length(p);
      minR = min(minR, r);
      float dt = clamp(0.085 * r, 0.025, 0.9);
      vec3 acc = -1.5 * h2 * p / pow(r, 5.0);
      vec3 np = p + v * dt;
      v = normalize(v + acc * dt);

      // accretion disk (plane y = 0)
      if (p.y * np.y < 0.0){
        vec3 c = mix(p, np, p.y / (p.y - np.y));
        float cr = length(c.xz);
        if (cr > 2.35 && cr < 9.5){
          float w = uTime * 0.55 / pow(cr, 1.5);
          float cw = cos(w), sw = sin(w);
          vec2 rp = vec2(c.x * cw - c.z * sw, c.x * sw + c.z * cw);
          float ang = atan(rp.y, rp.x);
          float swirl = fbm(vec3(rp * 0.9, cr * 1.6));
          float bands = 0.72 + 0.28 * sin(cr * 4.0 + swirl * 9.0);
          float streak = fbm(vec3(cr * 3.2, sin(ang) * 2.5 + swirl, cos(ang) * 2.5));
          float dens = bands * (0.25 + 1.1 * streak * streak);
          float inner = smoothstep(2.35, 3.0, cr);
          float outer = 1.0 - smoothstep(5.5, 9.5, cr);
          dens *= inner * outer;

          // temperature: white-hot inside, ember outside
          float t = clamp((cr - 2.35) / 6.5, 0.0, 1.0);
          vec3 hot  = vec3(1.0, 0.93, 0.80);
          vec3 warm = vec3(1.0, 0.56, 0.20);
          vec3 cool = vec3(0.55, 0.12, 0.04);
          vec3 dc = mix(hot, warm, smoothstep(0.0, 0.35, t));
          dc = mix(dc, cool, smoothstep(0.35, 1.0, t));

          // relativistic beaming: approaching side brighter
          vec3 tang = normalize(vec3(-c.z, 0.0, c.x));
          float beam = 1.0 + 0.75 * dot(tang, normalize(v));
          beam = pow(max(beam, 0.15), 2.2);

          float bright = (4.2 / (cr - 1.4)) * beam;
          float a = clamp(dens * 0.95, 0.0, 1.0);
          col += trans * dc * bright * a;
          trans *= (1.0 - a * 0.92);
        }
      }

      p = np;
      if (length(p) < 1.0){ captured = true; break; }
      if (length(p) > 60.0 && dot(p, v) > 0.0) break;
      if (trans < 0.02) break;
    }

    if (!captured) col += trans * sky(v);
    // photon ring glow where rays skimmed the photon sphere
    if (!captured) col += trans * vec3(1.0, 0.78, 0.52) * exp(-(minR - 1.5) * 7.0) * 0.55;

    // tone map + grade
    col = 1.0 - exp(-col * 1.05);
    col = pow(col, vec3(0.92, 0.97, 1.08));
    float vig = smoothstep(1.35, 0.25, length((gl_FragCoord.xy - 0.5 * uRes) / uRes.y));
    col *= mix(0.55, 1.0, vig);
    gl_FragColor = vec4(col, 1.0);
  }`;

  function compile(type, src) {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  }
  const vs = compile(gl.VERTEX_SHADER, vert), fs = compile(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) { document.documentElement.classList.add('no-webgl'); return; }
  const prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { document.documentElement.classList.add('no-webgl'); return; }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const U = {};
  ['uRes', 'uTime', 'uMouse', 'uScroll', 'uShift', 'uShiftY', 'uZoom'].forEach((n) => (U[n] = gl.getUniformLocation(prog, n)));

  // render-resolution scale, adapted to frame time
  let scale = mobile ? 0.45 : 0.6;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(2, Math.floor(innerWidth * dpr * scale));
    const h = Math.max(2, Math.floor(innerHeight * dpr * scale));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    gl.viewport(0, 0, w, h);
  }
  resize();
  addEventListener('resize', resize, { passive: true });

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', (e) => {
    mouse.tx = (e.clientX / innerWidth) * 2 - 1;
    mouse.ty = -((e.clientY / innerHeight) * 2 - 1);
  }, { passive: true });

  let scroll = 0, sTarget = 0;
  const readScroll = () => {
    // innerHeight can be 0 while a tab is still hidden; never let NaN in
    const hero = Math.max(1, innerHeight);
    sTarget = Math.min(1, Math.max(0, scrollY / hero)) || 0;
  };
  addEventListener('scroll', readScroll, { passive: true });
  readScroll();

  let running = true, paused = false, t0 = performance.now(), last = t0, slow = 0, frames = 0;
  const api = (window.VOID = {
    pause() { paused = true; },
    resume() { if (paused) { paused = false; last = performance.now(); loop(last); } },
    pulse: 0
  });

  function frame(now) {
    const dt = Math.max(0, Math.min(0.05, (now - last) / 1000)); last = now;
    if (!Number.isFinite(scroll)) scroll = 0;
    if (!Number.isFinite(mouse.x + mouse.y)) { mouse.x = mouse.y = 0; }
    resize();
    mouse.x += (mouse.tx - mouse.x) * Math.min(1, dt * 2.5);
    mouse.y += (mouse.ty - mouse.y) * Math.min(1, dt * 2.5);
    scroll += (sTarget - scroll) * Math.min(1, dt * 4);
    const wide = innerWidth > 980;
    const shift = wide ? 0.42 * (1 - scroll) : 0.0;
    // phones: park the hole low behind the stats, rising to centre as you scroll
    const shiftY = wide ? 0.0 : -0.3 * (1 - scroll);
    const zoom = (wide ? 1.0 : 0.82) * (1 + scroll * 0.35) * (1 + api.pulse * 0.25);
    api.pulse *= 0.94;

    gl.uniform2f(U.uRes, canvas.width, canvas.height);
    gl.uniform1f(U.uTime, reduce ? 12.0 : (now - t0) / 1000);
    gl.uniform2f(U.uMouse, mouse.x, mouse.y);
    gl.uniform1f(U.uScroll, scroll);
    gl.uniform1f(U.uShift, shift);
    gl.uniform1f(U.uShiftY, shiftY);
    gl.uniform1f(U.uZoom, zoom);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    // adaptive quality: drop resolution if the GPU struggles
    frames++;
    if (dt > 0.034) slow++;
    if (frames === 90) {
      if (slow > 40 && scale > 0.3) { scale *= 0.75; resize(); }
      frames = 0; slow = 0;
    }
  }

  function loop(now) {
    if (!running || paused) return;
    frame(now);
    if (!reduce) requestAnimationFrame(loop);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) running = false;
    else if (!running) { running = true; last = performance.now(); requestAnimationFrame(loop); }
  });
  if (reduce) {
    // still: draw once, redraw on resize
    addEventListener('resize', () => frame(performance.now()));
  }
  requestAnimationFrame(loop);
  document.documentElement.classList.add('has-webgl');
})();
