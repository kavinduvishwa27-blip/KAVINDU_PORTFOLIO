# Kavindu Vishwa Godagampola — Portfolio

Black-hole themed portfolio. Plain HTML, CSS and JavaScript: **no build step, nothing to install**.

- The background is the original black hole film (`assets/media/bg-video.mp4`, driven by `assets/js/blackhole.js`). Its poster (`assets/bg-poster.jpg`) shows instantly; the video loads only after the page has finished, is skipped on Save-Data, and drifts with the mouse and zooms deeper as you scroll.
- All projects and case studies come from **`assets/js/projects.js`**. Edit that file to change text, tags or photos, or to add a project.
- The CV preview renders `assets/cv.pdf` with pdf.js (loaded from cdnjs only when you scroll near it). Replace that file to update the CV.
- Visitors with "reduce motion" switched on get the still poster and no entrance animations.

## Files

| Path | What it is |
|---|---|
| `index.html` | The page |
| `assets/css/style.css` | All styles |
| `assets/js/blackhole.js` | Black hole video: lazy loading, parallax and scroll zoom |
| `assets/js/main.js` | Loader, cursor, projects grid, case studies, lightbox, CV viewer, audio |
| `assets/js/projects.js` | Project data |
| `assets/img/` | Photos (one folder per project) |
| `assets/media/bg-video.mp4`, `assets/bg-poster.jpg` | The black hole film and its first frame |
| `assets/media/bg-audio.mp4` | Optional ambient sound (only plays when the visitor presses the sound button) |
| `_headers` | Security and cache headers for **Cloudflare Pages** |
| `.nojekyll` | Tells **GitHub Pages** to serve files as-is |
| `404.html` | "Lost beyond the horizon" page (used by both hosts) |

## Preview locally

```bash
python -m http.server 8080
```

Then open http://localhost:8080. (Opening `index.html` directly also works, except for the CV preview, which needs a server.)

## Deploy

### 1. GitHub

```bash
git init
git add .
git commit -m "Black hole portfolio v2"
git branch -M main
git remote add origin https://github.com/kavinduvishwa27-blip/KAVINDU_PORTFOLIO.git
git push -u origin main
```

To replace the current site in the existing repo, push to the same branch GitHub Pages already uses (Settings → Pages → *Deploy from a branch* → `main` / root).

### 2. Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Pick the `KAVINDU_PORTFOLIO` repository.
3. Build settings: **Framework preset: None**, **Build command: _(leave empty)_**, **Build output directory: `/`**.
4. Save and deploy. Every push to `main` redeploys automatically.

Cloudflare applies `_headers` (security headers + caching). All paths in the site are relative, so it works both at `username.github.io/KAVINDU_PORTFOLIO/` and at the root of a `*.pages.dev` or custom domain.

### After choosing the final domain

Update the absolute URLs (used for link previews and search engines) in:
- `index.html`: `canonical`, `og:url`, `og:image`, `twitter:image`, and the `url` in the JSON-LD block
- `robots.txt` and `sitemap.xml`
