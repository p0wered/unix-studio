import {useEffect} from 'react';
import {useLocation} from 'react-router';
import {headTags, pageMeta} from '../../data/seo';

const KEY = 'data-page-meta';

/**
 * Keeps <title>, description, Open Graph and canonical in <head> in sync with the current page.
 * The prerendered HTML already has them for the first load; this handles navigation in the app.
 */
export function PageMeta() {
    const {pathname} = useLocation();
    useEffect(() => {
        document.title = pageMeta(pathname).title;
        // replace the tags this component (or the prerender script) wrote for the previous page
        document.head.querySelectorAll(`[${KEY}]`).forEach((el) => el.remove());
        for (const [tag, attrs] of headTags(pathname)) {
            const el = document.createElement(tag);
            for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value);
            el.setAttribute(KEY, '');
            document.head.appendChild(el);
        }
    }, [pathname]);
    return null;
}
