import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {port: 3000},
    preview: {port: 4173},
    build: {
        // scripts/prerender.js reads it to link each page's CSS/JS chunks into its static HTML
        manifest: true,
    },
    ssr: {
        // bundle all dependencies into the renderer used by the prerender (avoids CJS/ESM interop issues)
        noExternal: true,
    },
});
