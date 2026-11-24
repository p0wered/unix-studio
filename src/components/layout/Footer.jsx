import {Link} from 'react-router';
import {m} from 'motion/react';
import {ParallaxBanner, ParallaxBannerLayer} from 'react-scroll-parallax';
import {Reveal} from '../motion/Reveal';
import {EASE_OUT} from '../motion/presets';
import {CONTACTS, SOCIAL_LINKS} from '../../data/navigation';
import FooterImg from '../../assets/footer.webp';
import FooterArrow from '../../assets/footer-arrow.svg';
import ArrowUp from '../../assets/arrow_up.svg';

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

const labelStyle = {color: '#7c7c7c', fontSize: 16};

export function Footer() {
    return (
        <footer>
            <div className='footer-container'>
                <div className='inner'>
                    <Reveal className='footer-grid' variants={linksVariants} transition={{}}>
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
                        <p className='change-font' style={labelStyle}>OUR TEAM IS</p>
                        <h4>{CONTACTS.location}</h4>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className='change-font' style={labelStyle}>DROP US A LINE</p>
                        <h4 className='change-font' style={{fontWeight: 500}}>{CONTACTS.email}</h4>
                    </Reveal>
                    <Reveal
                        className='footer-btn-container'
                        whileHover={{
                            border: '1px solid var(--content-dark)',
                            backgroundColor: 'var(--content-light)',
                            color: 'var(--content-dark)',
                        }}
                    >
                        <Link to='/contact' className='footer-btn change-font'>
                            <p>BECOME A CLIENT</p>
                            <img src={FooterArrow} alt=''/>
                        </Link>
                    </Reveal>
                    <Reveal className='merger'>
                        <button
                            type='button'
                            className='to-top'
                            aria-label='Back to top'
                            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                        >
                            <img src={ArrowUp} alt=''/>
                        </button>
                        <p className='change-font' style={{fontSize: 16}}>
                            © {new Date().getFullYear()} Unix Studio. — Product Design Agency
                        </p>
                    </Reveal>
                </div>
            </div>
            <ParallaxBanner>
                <div className='footer-bg'>
                    <ParallaxBannerLayer image={FooterImg} speed={-15}/>
                </div>
            </ParallaxBanner>
        </footer>
    );
}
