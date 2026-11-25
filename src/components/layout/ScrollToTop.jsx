import {useLayoutEffect, useRef} from 'react';
import {useLocation} from 'react-router';

/**
 * When the page (path) changes: jump to the top and move keyboard / screen-reader focus to the new
 * content (otherwise focus stays on the clicked link in the old page's place).
 * `instant`, because <html> has `scroll-behavior: smooth` and a smooth scroll would show the new page
 * scrolling up from the old position. Query-string changes (case filters) keep scroll and focus.
 */
export function ScrollToTop() {
    const {pathname} = useLocation();
    const first = useRef(true);
    useLayoutEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'instant'});
        if (first.current) {
            first.current = false;
            return;
        }
        document.getElementById('main')?.focus({preventScroll: true});
    }, [pathname]);
    return null;
}
