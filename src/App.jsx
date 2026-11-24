import {lazy, Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router';
import {ParallaxProvider} from 'react-scroll-parallax';
import {domAnimation, LazyMotion} from 'motion/react';
import AnimatedCursor from 'react-animated-cursor';
import {NavBar} from './components/layout/NavBar';
import {ScrollToTop} from './components/layout/ScrollToTop';

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

export default function App() {
    return (
        // Only the animation features the site uses (no drag / layout animations): a smaller bundle.
        // `strict` throws if a full `motion.*` component sneaks in instead of `m.*`.
        <LazyMotion features={domAnimation} strict>
            <BrowserRouter>
                <ParallaxProvider>
                    <ScrollToTop/>
                    <AnimatedCursor {...cursorProps}/>
                    <NavBar/>
                    {/* dark, full-height placeholder so the page doesn't flash white while its chunk loads */}
                    <Suspense fallback={<div className='page-fallback'/>}>
                        <Routes>
                            <Route path='/' element={<HomePage/>}/>
                            <Route path='/cases' element={<CasesPage/>}/>
                            <Route path='/about' element={<AboutPage/>}/>
                            <Route path='/services' element={<ServicesPage/>}/>
                            <Route path='/contact' element={<ContactPage/>}/>
                            <Route path='*' element={<NotFoundPage/>}/>
                        </Routes>
                    </Suspense>
                </ParallaxProvider>
            </BrowserRouter>
        </LazyMotion>
    );
}
