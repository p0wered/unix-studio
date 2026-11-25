# UNIXSTUDIO

Landing site for a digital agency: home, cases (with category filters), about, plus placeholder services/contact pages.

**Stack:** React 19 · Vite 8 · React Router 8 · motion (animations) · Embla (carousel) · CSS Modules \
**Fonts:** Panchang, Hubot Sans \
**Colours:**
![#131313](https://placehold.co/15x15/131313/131313.png) `#131313`
![#ffffff](https://placehold.co/15x15/ffffff/ffffff.png) `#ffffff`
![#c8ea21](https://placehold.co/15x15/c8ea21/c8ea21.png) `#c8ea21`
(design tokens: `src/styles/base.css`)

![Preview](docs/preview.webp)

## Getting started

Node 22.22+ (see `.nvmrc`).

```bash
npm install
npm run dev          # http://localhost:3000
```

| Command                      | What it does                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| `npm run dev`                | Dev server with hot reload                                                           |
| `npm run build`              | Production build in `dist/`, every page prerendered to static HTML                   |
| `npm run preview`            | Serves `dist/` like a static host would (folders → `index.html`, unknown → 404 page) |
| `npm run lint`               | ESLint                                                                               |
| `npm run format`             | Prettier (`format:check` only checks)                                                |
| `npm run check:size`         | JS/CSS size budget per page (after a build)                                          |
| `npm test`                   | build + size budget + all Playwright tests                                           |
| `npm run test:visual`        | screenshot comparison of every page at 5 widths                                      |
| `npm run test:visual:update` | accept the current look as the new baseline                                          |
| `npm run test:a11y`          | axe-core audit (WCAG 2.1 AA) + keyboard checks                                       |
| `npm run test:lighthouse`    | Lighthouse CI on the build (performance / a11y / best practices / SEO ≥ 90)          |

Playwright needs its browser once: `npx playwright install chromium`. Lighthouse uses Chrome; without it,
point it at Playwright's: `CHROME_PATH=$(node -e "console.log(require('@playwright/test').chromium.executablePath())") npm run test:lighthouse`.

## Project structure

```
src/
  main.jsx               entry: hydrates the prerendered HTML (or renders, in dev)
  App.jsx                router, layout, cursor, motion config
  entry-server.jsx       renders a page to HTML at build time (used by scripts/prerender.js)
  pages/                 one component + CSS module per page (each is its own chunk)
  components/
    layout/              NavBar, Footer, PageLayout, PageMeta, ScrollToTop
    motion/              Reveal, AnimatedHeading, ParallaxText, ParallaxImage, Separator, presets
    ui/                  Hero, Carousel, Testimonial, StatCell, GetInTouchBadge, CircularText, …
  data/                  site content: navigation, cases, stats, reviews, SEO texts
  hooks/                 useMediaQuery, useHydrated
  styles/                base.css (tokens, typography, utilities), fonts.css
public/                  fonts, icons, manifest, Open Graph image
scripts/                 prerender.js, check-size.js
tests/                   visual (screenshots), a11y, local static server
docs/                    improvement plan, screenshots
```

Content (texts, cases, stats, links) lives in `src/data/`. A case is one entry in `src/data/cases.js`; its
category button on /cases appears automatically.

## How it works

- **Prerendering.** `npm run build` builds the client, then renders every route to `dist/<route>/index.html`
  (and `dist/404.html`) with its own `<title>`, description, Open Graph tags and the CSS of its page chunk. The
  browser hydrates that HTML, so pages are visible before JavaScript runs and crawlers get real content.
- **Site address.** Canonical links, `og:url`, `og:image` and `sitemap.xml` need the absolute address:
  `VITE_SITE_URL=https://your-domain.com npm run build`. Without it they are left out.
- **Animations** use `motion` with `LazyMotion` (`m.*` components only) and respect "reduce motion" in the OS.
  Reveal-on-scroll elements: `<Reveal>` / `<RevealItem>` in `src/components/motion/Reveal.jsx`.
- **Headings** that animate letter by letter keep a visually hidden real heading for screen readers; the
  visible letters borrow their look from the `.h1`–`.h4` classes.

## Deploying

`dist/` is a plain static site. `/cases` is `dist/cases/index.html`; unknown URLs should be answered with
`dist/404.html` (Netlify, Vercel, Cloudflare Pages and GitHub Pages do this by default).

## Tests and CI

`.github/workflows/ci.yml` runs on every push to `master` and every pull request: lint, Prettier, build, size
budget, accessibility tests and Lighthouse. On pull requests it also builds the base commit, photographs it, and
compares every page of the PR against it (screenshots aren't committed, since they depend on the OS and fonts).
The diff report is attached to the run when something changed. Set the repository variable `SITE_URL` to build
with the real address.

## Licenses

- Hubot Sans — © 2022 GitHub, SIL Open Font License 1.1 (subset for the web, see `src/styles/fonts.css`).
- Panchang — © 2024 Indian Type Foundry, [Fontshare](https://www.fontshare.com/fonts/panchang) license.
- CircularText — from [React Bits](https://reactbits.dev), MIT + Commons Clause (notice kept in the file).

The history of the 2026 refactor (what changed and why): [docs/improvement-plan.md](docs/improvement-plan.md).
