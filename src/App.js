import React, {Fragment, useEffect, useRef, useState} from 'react';
import {BrowserRouter, Link, NavLink, Route, Routes, useLocation} from "react-router-dom";
import HomePage from "./routes/home-page";
import ServicesPage from "./routes/services-page";
import ContactPage from "./routes/contact-page";
import AboutPage from "./routes/about-page";
import CasePage from "./routes/case-page";
import NotFoundPage from "./routes/not-found-page";
import {motion, useInView} from "framer-motion";
import AnimatedCursor from "react-animated-cursor";
import FooterImg from './assets/footer.webp';
import FooterArrow from './assets/footer-arrow.svg';
import ArrowUp from './assets/arrow_up.svg';
import {ParallaxBanner, ParallaxBannerLayer, ParallaxProvider} from "react-scroll-parallax";
import {Twirl as Hamburger} from 'hamburger-react'
import {SeparatorWide} from "./animations";

const MOBILE_MENU_QUERY = '(max-width: 720px)';

function NavBar(){
    const [menuOpen, setMenuOpen] = useState(false);
    const {pathname} = useLocation();

    // Close the menu on any navigation (links also close it on click, for when the path doesn't change)
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    // While the menu is open: lock page scroll, close on Esc, close when the viewport grows past the mobile layout
    useEffect(() => {
        if (!menuOpen) return;
        const mq = window.matchMedia(MOBILE_MENU_QUERY);
        const close = () => setMenuOpen(false);
        const onKeyDown = (e) => {
            if (e.key === 'Escape') close();
        };
        const onMqChange = (e) => {
            if (!e.matches) close();
        };
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', onKeyDown);
        mq.addEventListener('change', onMqChange);
        return () => {
            document.body.style.overflow = prevOverflow;
            document.removeEventListener('keydown', onKeyDown);
            mq.removeEventListener('change', onMqChange);
        };
    }, [menuOpen]);

    const linkTitles = {
        "HOME": "/",
        "CASES": "/cases",
        "ABOUT": "/about",
        "SERVICES": "/services",
        "CONTACT": "/contact",
    }

    const container = {
        hidden: {y: '-100%', opacity: 0.5},
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                delayChildren: 0.15,
                staggerChildren: 0.06,
                ease: [0.01, 0.95, 0.98, 1]
            }
        }
    }

    const mobileLink = {
        hidden: {y: '-100%', opacity: 0},
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                ease: [0.01, 0.95, 0.98, 1],
            }
        },
    }

    return(
        <>
            <motion.nav initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1, type: 'spring'}}>
                <div>
                    <NavLink className='logo primary-link' to='/' onClick={() => setMenuOpen(false)}>UNIXSTUDIO</NavLink>
                </div>
                <div className='links change-font'>
                    <NavLink className='primary-link' to='/'>HOME</NavLink>
                    <NavLink className='primary-link' to='/cases'>CASES</NavLink>
                    <NavLink className='primary-link' to='/about'>ABOUT</NavLink>
                    <NavLink className='primary-link' to='/services'>SERVICES</NavLink>
                    <NavLink className='primary-link' to='/contact'>CONTACT</NavLink>
                </div>
                <div className='menu-icon'>
                    <Hamburger toggled={menuOpen} toggle={setMenuOpen} size={26} duration={0.3} label='Toggle menu'/>
                </div>
            </motion.nav>
            <motion.div
                variants={container}
                initial="hidden"
                animate={menuOpen ? "visible" : "hidden"}
                className='mobile-menu'
                aria-hidden={!menuOpen}
                // a closed menu stays in the DOM (off-screen), so take it out of the tab order
                inert={menuOpen ? undefined : ''}
            >
                {Object.entries(linkTitles).map(([title, url]) => (
                    <Fragment key={url}>
                        <motion.div variants={mobileLink}>
                            <NavLink className='mobile-link' to={url} onClick={() => setMenuOpen(false)}>
                                <h2>{title}</h2>
                            </NavLink>
                        </motion.div>
                        <SeparatorWide/>
                    </Fragment>
                ))}
            </motion.div>
        </>
    )
}

export function Footer() {
    const linksRef = useRef();
    const locationRef = useRef();
    const emailRef = useRef();
    const btnRef = useRef();
    const copyRef = useRef();
    const linksInView = useInView(linksRef, {once: false});
    const locationInView = useInView(locationRef, {once: false});
    const emailInView = useInView(emailRef, {once: false});
    const btnInView = useInView(btnRef, {once: false});
    const copyInView = useInView(copyRef, {once: false});

    const container = {
        hidden: {opacity: 1},
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.06,
                ease: [0.01, 0.95, 0.98, 1]
            }
        }
    }

    const link = {
        hidden: {y: '100%', opacity: 0},
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                ease: [0.01, 0.95, 0.98, 1],
            }
        },
    }

    const mediaItems = {
        "Facebook": "https://www.facebook.com",
        "Instagram": "https://www.instagram.com",
        "Dribbble": "https://dribbble.com",
        "Linkedin": "https://www.linkedin.com",
        "Behance": "https://www.behance.com",
        "Telegram": "https://www.telegram.com",
    }

    return(
        <footer>
            <div className='footer-container'>
                <div className='inner'>
                    <motion.div
                        ref={linksRef}
                        className='footer-grid'
                        variants={container}
                        initial="hidden"
                        animate={linksInView ? "visible" : "hidden"}
                    >
                        {Object.entries(mediaItems).map(([label, url], index) => (
                            <motion.a
                                href={url}
                                target='_blank'
                                rel='noopener noreferrer'
                                key={label}
                                variants={link}
                                whileHover={{
                                    border: '1px solid transparent',
                                    backgroundColor: 'var(--content-dark)',
                                    color: 'var(--content-light)'
                                }}
                            >
                                {label}
                            </motion.a>
                        ))}
                    </motion.div>
                    <motion.div
                        ref={locationRef}
                        transition={{duration: 0.7, ease: [0.01, 0.95, 0.98, 1]}}
                        initial={{y: '100%', opacity: 0}}
                        animate={locationInView ? {y: 0, opacity: 1} : {y: '100%', opacity: 0}}
                    >
                        <p className='change-font' style={{color: '#7c7c7c', fontSize: 16}}>OUR TEAM IS</p>
                        <h4>IN NEW YORK, USA</h4>
                    </motion.div>
                    <motion.div
                        ref={emailRef}
                        transition={{duration: 0.7, ease: [0.01, 0.95, 0.98, 1], delay: 0.1}}
                        initial={{y: '100%', opacity: 0}}
                        animate={emailInView ? {y: 0, opacity: 1} : {y: '100%', opacity: 0}}
                    >
                        <p className='change-font' style={{color: '#7c7c7c', fontSize: 16}}>DROP US A LINE</p>
                        <h4 className='change-font' style={{fontWeight: 500}}>contact@unixstudio.agency</h4>
                    </motion.div>
                    <motion.div
                        className='footer-btn-container'
                        ref={btnRef}
                        transition={{duration: 0.7, ease: [0.01, 0.95, 0.98, 1]}}
                        initial={{y: '100%', opacity: 0}}
                        animate={btnInView ? {y: 0, opacity: 1} : {y: '100%', opacity: 0}}
                        whileHover={{
                            border: '1px solid var(--content-dark)',
                            backgroundColor: 'var(--content-light)',
                            color: 'var(--content-dark)'
                        }}
                    >
                        <Link to='/contact' className='footer-btn change-font'>
                            <p>BECOME A CLIENT</p>
                            <img src={FooterArrow} alt='arrow'/>
                        </Link>
                    </motion.div>
                    <motion.div
                        ref={copyRef}
                        transition={{duration: 0.7, ease: [0.01, 0.95, 0.98, 1]}}
                        initial={{y: '100%', opacity: 0}}
                        animate={copyInView ? {y: 0, opacity: 1} : {y: '100%', opacity: 0}}
                        className='merger'
                    >
                        <button
                            type='button'
                            className='to-top'
                            aria-label='Back to top'
                            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                        >
                            <img src={ArrowUp} alt=''/>
                        </button>
                        <p className='change-font' style={{fontSize: 16}}>© {new Date().getFullYear()} Unix Studio. — Product Design
                            Agency</p>
                    </motion.div>
                </div>
            </div>
            <ParallaxProvider>
                <ParallaxBanner>
                    <div className='footer-bg'>
                        <ParallaxBannerLayer image={FooterImg} speed={-15}/>
                    </div>
                </ParallaxBanner>
            </ParallaxProvider>
        </footer>
    )
}

function App() {
    return (
        <BrowserRouter>
            <AnimatedCursor
                innerSize={8}
                outerSize={34}
                innerScale={1.1}
                outerScale={2}
                outerAlpha={1}
                innerStyle={{
                    backgroundColor: 'var(--cursor-color)'
                }}
                outerStyle={{
                    backgroundColor: 'var(--cursor-color)',
                    mixBlendMode: 'exclusion'
                }}
            />
            <NavBar/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/services' element={<ServicesPage/>}/>
                <Route path='/contact' element={<ContactPage/>}/>
                <Route path='/about' element={<AboutPage/>}/>
                <Route path='/cases' element={<CasePage/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
            </Routes>
      </BrowserRouter>
  );
}

export default App;
