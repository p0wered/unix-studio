// Size budget: gzip size of what each page downloads on a first visit (the app entry + that page's chunk
// and its dependencies), checked against limits. Run after `npm run build`: npm run check:size
// Raise a limit deliberately (and say why in the commit), never just to make CI green.

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

// KB, gzip. Measured when the budget was set (Nov 2026): JS 122–143 (home is the largest), CSS 2–6.
const BUDGET = {js: 150, css: 8};

const PAGES = {
    '/': 'src/pages/HomePage.jsx',
    '/cases': 'src/pages/CasesPage.jsx',
    '/about': 'src/pages/AboutPage.jsx',
    '/services': 'src/pages/ServicesPage.jsx',
    '/contact': 'src/pages/ContactPage.jsx',
};

const manifest = JSON.parse(fs.readFileSync(path.join(dist, '.vite/manifest.json'), 'utf8'));
const entryKey = Object.keys(manifest).find((k) => manifest[k].isEntry);

function collect(key, seen = new Set(), files = {js: new Set(), css: new Set()}) {
    if (seen.has(key)) return files;
    seen.add(key);
    const chunk = manifest[key];
    files.js.add(chunk.file);
    for (const css of chunk.css ?? []) files.css.add(css);
    for (const dep of chunk.imports ?? []) collect(dep, seen, files);
    return files;
}

const gzipKB = (files) =>
    [...files].reduce((sum, f) => sum + zlib.gzipSync(fs.readFileSync(path.join(dist, f)), {level: 9}).length, 0) /
    1024;

let failed = false;
console.log('page        JS (gzip)   CSS (gzip)');
for (const [url, page] of Object.entries(PAGES)) {
    const files = collect(page, new Set(), collect(entryKey));
    const js = gzipKB(files.js);
    const css = gzipKB(files.css);
    const over = js > BUDGET.js || css > BUDGET.css;
    failed ||= over;
    console.log(
        `${url.padEnd(10)}  ${js.toFixed(1).padStart(6)} KB   ${css.toFixed(1).padStart(6)} KB${over ? '   ✗ over budget' : ''}`,
    );
}
console.log(`budget      ${String(BUDGET.js).padStart(6)} KB   ${String(BUDGET.css).padStart(6)} KB`);

if (failed) {
    console.error('\nSize budget exceeded (scripts/check-size.js).');
    process.exit(1);
}
