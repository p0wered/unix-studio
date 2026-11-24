import {useLayoutEffect} from 'react';
import {useLocation} from 'react-router';

/**
 * Jump to the top when the page (path) changes. `instant`, because <html> has `scroll-behavior: smooth`
 * and a smooth scroll would show the new page scrolling up from the old position.
 * Query-string changes (case filters) keep the scroll position.
 */
export function ScrollToTop() {
    const {pathname} = useLocation();
    useLayoutEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'instant'});
    }, [pathname]);
    return null;
}
