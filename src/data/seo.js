// Per-page <title> / description / Open Graph. Used by <PageMeta> in the browser and by
// scripts/prerender.js when it writes the static HTML of every page.

export const SITE_NAME = 'UNIXSTUDIO';

/**
 * Absolute site address, e.g. https://unixstudio.agency — set VITE_SITE_URL at build time.
 * Needed for canonical links, og:url, og:image and the sitemap; without it those are left out.
 */
export const SITE_URL = (import.meta.env?.VITE_SITE_URL ?? '').replace(/\/$/, '');

export const OG_IMAGE = '/og-image.jpg';

const DEFAULT_DESCRIPTION =
    'We build engaging user experience for early-stage startups by connecting the dots between users’ needs and the client’s business model.';

export const PAGES = {
    '/': {
        title: 'UNIXSTUDIO — Digital Agency',
        description: DEFAULT_DESCRIPTION,
    },
    '/cases': {
        title: 'Cases — UNIXSTUDIO',
        description: 'Take a look behind the scenes, and discover the untold stories behind our projects, lessons learned, work culture, and business curiosities.',
    },
    '/about': {
        title: 'About — UNIXSTUDIO',
        description: 'We live by the code of passion: we combine human empathy and intelligent data to build products that work for people and for business.',
    },
    '/services': {
        title: 'Services — UNIXSTUDIO',
        description: 'Marketing and communication plans, branding, digital campaigns, programmatic advertising and marketing as a service.',
    },
    '/contact': {
        title: 'Contact — UNIXSTUDIO',
        description: 'Drop us a line: contact@unixstudio.agency. Our team is in New York, USA.',
    },
};

export const NOT_FOUND = {
    title: 'Page not found — UNIXSTUDIO',
    description: DEFAULT_DESCRIPTION,
    noindex: true,
};

export function pageMeta(pathname) {
    return PAGES[pathname] ?? NOT_FOUND;
}

/** All head tags for a page, as [tag, attributes] pairs (rendered by the prerender script and PageMeta). */
export function headTags(pathname) {
    const meta = pageMeta(pathname);
    const url = SITE_URL && PAGES[pathname] ? SITE_URL + pathname : null;
    return [
        ['meta', {name: 'description', content: meta.description}],
        ['meta', {property: 'og:type', content: 'website'}],
        ['meta', {property: 'og:site_name', content: SITE_NAME}],
        ['meta', {property: 'og:title', content: meta.title}],
        ['meta', {property: 'og:description', content: meta.description}],
        ['meta', {name: 'twitter:card', content: 'summary_large_image'}],
        ...(SITE_URL ? [['meta', {property: 'og:image', content: SITE_URL + OG_IMAGE}]] : []),
        ...(url ? [['meta', {property: 'og:url', content: url}], ['link', {rel: 'canonical', href: url}]] : []),
        ...(meta.noindex ? [['meta', {name: 'robots', content: 'noindex'}]] : []),
    ];
}
