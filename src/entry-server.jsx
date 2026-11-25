// Build-time renderer for scripts/prerender.js: the app's HTML for one URL.
import {StrictMode} from 'react';
import {prerender} from 'react-dom/static';
import {StaticRouter} from 'react-router';
import {AppShell} from './App';

export async function render(url) {
    // prerender (unlike renderToString) waits for the lazy page chunks, so the HTML is the full page.
    // progressiveChunkSize: React moves large Suspense boundaries (> ~12.8 KB by default) out of the
    // markup into a hidden block revealed by an inline script — useful for streaming, but in a static file
    // it means "nothing visible without JavaScript". Keep everything inline.
    const {prelude} = await prerender(
        <StrictMode>
            <StaticRouter location={url}>
                <AppShell />
            </StaticRouter>
        </StrictMode>,
        {progressiveChunkSize: Number.MAX_SAFE_INTEGER},
    );
    return new Response(prelude).text();
}

// re-exported for the prerender script (it can't import src/ directly: import.meta.env is Vite-only)
export * as seo from './data/seo';
