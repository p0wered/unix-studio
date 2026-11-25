// Minimal static server for the prerendered build (visual tests): node serve.mjs <dir> <port>
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] ?? 'dist');
const port = Number(process.argv[3] ?? 4173);

const types = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf',
};

http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    // like a static host: a directory serves its index.html, anything unknown the prerendered 404.html
    let file = path.join(root, urlPath);
    if (file.startsWith(root) && fs.existsSync(file) && fs.statSync(file).isDirectory()) {
        file = path.join(file, 'index.html');
    }
    let status = 200;
    if (!file.startsWith(root) || !fs.existsSync(file)) {
        file = path.join(root, '404.html');
        status = 404;
    }
    res.writeHead(status, {'Content-Type': types[path.extname(file)] ?? 'application/octet-stream'});
    fs.createReadStream(file).pipe(res);
}).listen(port, () => console.log(`serving ${root} on http://localhost:${port}`));
