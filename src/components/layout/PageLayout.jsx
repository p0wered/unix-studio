import {Suspense} from 'react';
import {Outlet} from 'react-router';
import {Footer} from './Footer';

/**
 * <main> with the current page (+ the footer, outside <main>, on pages that have one).
 * id/tabIndex: target of the "Skip to content" link and of the focus move on navigation.
 */
export function PageLayout({footer = false}) {
    return (
        <>
            <main id='main' tabIndex={-1}>
                {/* dark, full-height placeholder so the page doesn't flash white while its chunk loads */}
                <Suspense fallback={<div className='page-fallback'/>}>
                    <Outlet/>
                </Suspense>
            </main>
            {footer && <Footer/>}
        </>
    );
}
