import {Fragment, useEffect, useState} from 'react';
import {NavLink, useLocation} from 'react-router';
import {m} from 'motion/react';
import {Twirl as Hamburger} from 'hamburger-react';
import {Separator} from '../motion/Separator';
import {EASE_OUT} from '../motion/presets';
import {NAV_LINKS} from '../../data/navigation';
import styles from './NavBar.module.css';

const MOBILE_MENU_QUERY = '(max-width: 720px)';

const menuVariants = {
    hidden: {y: '-100%', opacity: 0.5},
    visible: {
        y: 0,
        opacity: 1,
        transition: {delayChildren: 0.15, staggerChildren: 0.06, ease: EASE_OUT},
    },
};

const menuLinkVariants = {
    hidden: {y: '-100%', opacity: 0},
    visible: {y: 0, opacity: 1, transition: {ease: EASE_OUT}},
};

export function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const closeMenu = () => setMenuOpen(false);

    // Close the menu on any navigation (links also close it on click, for when the path doesn't change).
    // Adjusting state while rendering instead of in an effect: https://react.dev/learn/you-might-not-need-an-effect
    const {pathname} = useLocation();
    const [menuPath, setMenuPath] = useState(pathname);
    if (pathname !== menuPath) {
        setMenuPath(pathname);
        setMenuOpen(false);
    }

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

    return (
        <>
            <m.nav className={styles.nav} initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1, type: 'spring'}}>
                <div>
                    <NavLink className={`${styles.logo} primary-link`} to='/' onClick={closeMenu}>UNIXSTUDIO</NavLink>
                </div>
                <div className={`${styles.links} change-font`}>
                    {NAV_LINKS.map(({label, to}) => (
                        <NavLink key={to} className='primary-link' to={to}>{label}</NavLink>
                    ))}
                </div>
                <div className={styles.menuIcon}>
                    <Hamburger toggled={menuOpen} toggle={setMenuOpen} size={26} duration={0.3} label='Toggle menu'/>
                </div>
            </m.nav>
            <m.div
                variants={menuVariants}
                initial='hidden'
                animate={menuOpen ? 'visible' : 'hidden'}
                className={styles.mobileMenu}
                aria-hidden={!menuOpen}
                // a closed menu stays in the DOM (off-screen), so take it out of the tab order
                inert={!menuOpen}
            >
                {NAV_LINKS.map(({label, to}) => (
                    <Fragment key={to}>
                        <m.div variants={menuLinkVariants}>
                            <NavLink to={to} onClick={closeMenu}>
                                <h2>{label}</h2>
                            </NavLink>
                        </m.div>
                        <Separator wide dark/>
                    </Fragment>
                ))}
            </m.div>
        </>
    );
}
