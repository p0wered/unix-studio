// Writes a static HTML file for every page into dist/, after `vite build` (client) and
// `vite build --ssr src/entry-server.jsx` (renderer). Each file has the page's markup, its own <title> /
// description / Open Graph tags, and <link>s to the CSS + JS of its page chunk, so it is styled before
// any JavaScript runs. The browser then hydrates it (src/main.jsx).
//
// Set VITE_SITE_URL (e.g. https://unixstudio.agency) to also get canonical/og:url/og:image and a sitemap.

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

// the SEO module reads import.meta.env, which only exists inside Vite: load it through the SSR bundle
const {render, seo} = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const {headTags, pageMeta, PAGES, SITE_URL} = seo;

const ROUTES = [
    {url: '/', page: 'src/pages/HomePage.jsx', out: 'index.html'},
    {url: '/cases', page: 'src/pages/CasesPage.jsx', out: 'cases/index.html'},
    {url: '/about', page: 'src/pages/AboutPage.jsx', out: 'about/index.html'},
    {url: '/services', page: 'src/pages/ServicesPage.jsx', out: 'services/index.html'},
    {url: '/contact', page: 'src/pages/ContactPage.jsx', out: 'contact/index.html'},
    // any unknown URL: static hosts (Netlify, Vercel, GitHub Pages, …) serve 404.html
    {url: '/404', page: 'src/pages/NotFoundPage.jsx', out: '404.html'},
];

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(dist, '.vite/manifest.json'), 'utf8'));

/** CSS and JS files a page chunk needs (its own + everything it statically imports). */
function chunkFiles(key, seen = new Set(), out = {css: new Set(), js: new Set()}) {
    if (seen.has(key)) return out;
    seen.add(key);
    const chunk = manifest[key];
    if (!chunk) throw new Error(`prerender: ${key} is not in the Vite manifest`);
    // dependencies first: that's the order Vite inserts their CSS in when it loads the chunk
    for (const dep of chunk.imports ?? []) chunkFiles(dep, seen, out);
    out.js.add(chunk.file);
    for (const css of chunk.css ?? []) out.css.add(css);
    return out;
}

const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escapeText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** <title> + meta tags: go where the template's <title> is. */
function metaHtml(url) {
    return headTags(url).map(([tag, attrs]) => {
        const a = Object.entries(attrs).map(([k, v]) => `${k}="${escapeAttr(v)}"`).join(' ');
        return `<${tag} ${a} data-page-meta>`;
    }).join('\n  ');
}

/**
 * The page chunk's CSS/JS: go at the end of <head>, *after* the entry CSS, the same order as when the
 * chunk is loaded at runtime (page module rules must win over base.css at equal specificity).
 */
function chunkHtml(page) {
    const entry = Object.values(manifest).find((c) => c.isEntry);
    const entryFiles = chunkFiles(Object.keys(manifest).find((k) => manifest[k] === entry));
    const files = chunkFiles(page);
    const css = [...files.css].filter((f) => !entryFiles.css.has(f));      // entry CSS is already in the template
    const js = [...files.js].filter((f) => !entryFiles.js.has(f));
    return [
        ...css.map((f) => `<link rel="stylesheet" href="/${f}">`),
        ...js.map((f) => `<link rel="modulepreload" href="/${f}">`),
    ].join('\n  ');
}

for (const {url, page, out} of ROUTES) {
    const appHtml = await render(url);
    const html = template
        .replace(/<title>.*?<\/title>/s, `<title>${escapeText(pageMeta(url).title)}</title>\n  ${metaHtml(url)}`)
        .replace('</head>', `  ${chunkHtml(page)}\n</head>`)
        .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    if (html === template) throw new Error('prerender: template placeholders not found');
    const file = path.join(dist, out);
    fs.mkdirSync(path.dirname(file), {recursive: true});
    fs.writeFileSync(file, html);
    console.log(`prerendered ${url.padEnd(10)} → dist/${out} (${(html.length / 1024).toFixed(0)} KB)`);
}

// robots.txt (+ sitemap when the site address is known)
const robots = ['User-agent: *', 'Allow: /'];
if (SITE_URL) {
    const urls = Object.keys(PAGES).map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join('\n');
    fs.writeFileSync(path.join(dist, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
    robots.push(`Sitemap: ${SITE_URL}/sitemap.xml`);
    console.log('wrote sitemap.xml');
} else {
    console.log('VITE_SITE_URL not set: no sitemap, canonical, og:url or og:image');
}
fs.writeFileSync(path.join(dist, 'robots.txt'), robots.join('\n') + '\n');

fs.rmSync(ssrDir, {recursive: true, force: true});
