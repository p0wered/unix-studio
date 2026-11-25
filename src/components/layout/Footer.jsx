import {Link} from 'react-router';
import {m} from 'motion/react';
import {Reveal} from '../motion/Reveal';
import {ParallaxImage} from '../motion/ParallaxImage';
import {EASE_OUT} from '../motion/presets';
import {CONTACTS, SOCIAL_LINKS} from '../../data/navigation';
import FooterImg from '../../assets/footer.webp';
import FooterArrow from '../../assets/footer-arrow.svg';
import ArrowUp from '../../assets/arrow_up.svg';
import styles from './Footer.module.css';

const linksVariants = {
    hidden: {opacity: 1},
    visible: {
        opacity: 1,
        transition: {delayChildren: 0.1, staggerChildren: 0.06, ease: EASE_OUT},
    },
};

const linkVariants = {
    hidden: {y: '100%', opacity: 0},
    visible: {y: 0, opacity: 1, transition: {ease: EASE_OUT}},
};

// respects "reduce motion" in the OS
const scrollToTop = () => window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
});

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.inner}>
                    <Reveal className={styles.socials} variants={linksVariants} transition={{}}>
                        {SOCIAL_LINKS.map(({label, href}) => (
                            <m.a
                                key={label}
                                href={href}
                                target='_blank'
                                rel='noopener noreferrer'
                                variants={linkVariants}
                                whileHover={{
                                    border: '1px solid transparent',
                                    backgroundColor: 'var(--content-dark)',
                                    color: 'var(--content-light)',
                                }}
                            >
                                {label}
                            </m.a>
                        ))}
                    </Reveal>
                    <Reveal>
                        <p className={`change-font ${styles.label}`}>OUR TEAM IS</p>
                        <p className='h4'>{CONTACTS.location}</p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className={`change-font ${styles.label}`}>DROP US A LINE</p>
                        <p className={`h4 change-font ${styles.email}`}>{CONTACTS.email}</p>
                    </Reveal>
                    <Reveal
                        className={styles.ctaContainer}
                        whileHover={{
                            border: '1px solid var(--content-dark)',
                            backgroundColor: 'var(--content-light)',
                            color: 'var(--content-dark)',
                        }}
                    >
                        <Link to='/contact' className={`${styles.cta} change-font`}>
                            <p>BECOME A CLIENT</p>
                            <img src={FooterArrow} alt=''/>
                        </Link>
                    </Reveal>
                    <Reveal className={styles.bottom}>
                        <button
                            type='button'
                            className={styles.toTop}
                            aria-label='Back to top'
                            onClick={scrollToTop}
                        >
                            <img src={ArrowUp} alt=''/>
                        </button>
                        {/* the year comes from the visitor's clock; the prerendered HTML has the build year */}
                        <p className={`change-font ${styles.copyright}`} suppressHydrationWarning>
                            © {new Date().getFullYear()} Unix Studio. — Product Design Agency
                        </p>
                    </Reveal>
                </div>
            </div>
            <ParallaxImage image={FooterImg} speed={-15} className={styles.image}/>
        </footer>
    );
}
