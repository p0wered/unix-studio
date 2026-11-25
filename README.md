# UNIXSTUDIO

## Front-end Project using React + Vite

**Type:** Landing Page \
**Subject:** Digital Agency \
**Version:** 0.4.1 \
**Fonts**: Panchang, Hubot Sans \
**Color Palette**:\
![#1a1a1a](https://placehold.co/15x15/1a1a1a/1a1a1a.png) `#1a1a1a`\
![#ffffff](https://placehold.co/15x15/ffffff/ffffff.png) `#ffffff`\
![#c8ea21](https://placehold.co/15x15/c8ea21/c8ea21.png) `#c8ea21`


## Project Setup

* ### `npm install`
* ### `npm run dev` — dev server on http://localhost:3000
* ### `npm run build` — production build in `dist/`, every page prerendered to static HTML

Set the site address when building for production, so canonical links, Open Graph images and the sitemap are generated:

```bash
VITE_SITE_URL=https://your-domain.com npm run build
```

`dist/` is a static site: `/cases` is `dist/cases/index.html`, unknown URLs should get `dist/404.html`
(Netlify, Vercel, Cloudflare Pages and GitHub Pages do both by default).

Visual regression tests (Playwright): `npx playwright install chromium` once, then `npm run test:visual`.
See [docs/improvement-plan.md](docs/improvement-plan.md).

## Preview

![Preview](docs/preview.webp)