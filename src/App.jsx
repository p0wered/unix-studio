import {lazy} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router';
import {domAnimation, LazyMotion, MotionConfig} from 'motion/react';
import AnimatedCursor from 'react-animated-cursor';
import {NavBar} from './components/layout/NavBar';
import {PageLayout} from './components/layout/PageLayout';
import {PageMeta} from './components/layout/PageMeta';
import {ScrollToTop} from './components/layout/ScrollToTop';
import {useMediaQuery} from './hooks/useMediaQuery';

// Every page is its own chunk: the first visit downloads only the page that was opened.
const HomePage = lazy(() => import('./pages/HomePage'));
const CasesPage = lazy(() => import('./pages/CasesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const cursorProps = {
    innerSize: 8,
    outerSize: 34,
    innerScale: 1.1,
    outerScale: 2,
    outerAlpha: 1,
    innerStyle: {backgroundColor: 'var(--cursor-color)'},
    outerStyle: {backgroundColor: 'var(--cursor-color)', mixBlendMode: 'exclusion'},
};

/**
 * The custom cursor only makes sense with a mouse. react-animated-cursor's own touch detection
 * (user-agent sniffing) never fires, so on phones it rendered a dot and hid nothing; gate it here.
 */
function Cursor() {
    const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
    return finePointer ? <AnimatedCursor {...cursorProps} /> : null;
}

/** Everything inside the router: shared by the browser (BrowserRouter) and the prerender (StaticRouter). */
export function AppShell() {
    return (
        // Only the animation features the site uses (no drag / layout animations): a smaller bundle.
        // `strict` throws if a full `motion.*` component sneaks in instead of `m.*`.
        <LazyMotion features={domAnimation} strict>
            {/* "Reduce motion" in the OS: transform animations are skipped, fades stay */}
            <MotionConfig reducedMotion='user'>
                <a href='#main' className='skip-link'>
                    Skip to content
                </a>
                <ScrollToTop />
                <PageMeta />
                <Cursor />
                <header>
                    <NavBar />
                </header>
                <Routes>
                    <Route element={<PageLayout footer />}>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/cases' element={<CasesPage />} />
                        <Route path='/about' element={<AboutPage />} />
                    </Route>
                    <Route element={<PageLayout />}>
                        <Route path='/services' element={<ServicesPage />} />
                        <Route path='/contact' element={<ContactPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </MotionConfig>
        </LazyMotion>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppShell />
        </BrowserRouter>
    );
}
