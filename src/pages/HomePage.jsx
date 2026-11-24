import {useRef} from 'react';
import {Link} from 'react-router';
import {m, useInView} from 'motion/react';
import {ParallaxBanner, ParallaxBannerLayer} from 'react-scroll-parallax';
import {AnimatedHeading, AnimatedHeadingLetters} from '../components/motion/AnimatedHeading';
import {ParallaxText} from '../components/motion/ParallaxText';
import {Reveal} from '../components/motion/Reveal';
import {Separator} from '../components/motion/Separator';
import {EASE_OUT, FADE} from '../components/motion/presets';
import {Hero, HeroStar} from '../components/ui/Hero';
import {Carousel} from '../components/ui/Carousel';
import {Testimonial} from '../components/ui/Testimonial';
import {StatCell, StatContactCell} from '../components/ui/StatCell';
import {Footer} from '../components/layout/Footer';
import {useMediaQuery} from '../hooks/useMediaQuery';
import {CAROUSEL_CASES, HIGHLIGHT_PROJECT} from '../data/cases';
import {CEO_REVIEW, CLIENT_REVIEW, HIGHLIGHT_STATS, SERVICES, STATS} from '../data/home';
import StarDarkImg from '../assets/star-dark.svg';
import ArrowButton from '../assets/arrow_button.svg';
import Vector1 from '../assets/vector.svg';
import styles from './HomePage.module.css';

function AboutSection() {
    return (
        <div>
            <Separator/>
            <img src={Vector1} className={styles.vector} draggable={false} alt=''/>
            <div className={`${styles.about} container`}>
                <div className={styles.aboutHeadings}>
                    <AnimatedHeading text='LET’S FIND YOUR DESIGN PRODUCT' as='h2' inView/>
                    <AnimatedHeading text='SAFE AND BENEFICIAL DESIGN FOR HUMANITY' as='h4' inView/>
                </div>
                <Reveal className={`${styles.aboutText} change-font`}>
                    <p className={styles.narrow}>
                        We build engaging user experience for early-stage startups by connecting the dots between users’
                        needs and the client’s business model
                    </p>
                    <Link className='primary-link' to='/about'>See details</Link>
                </Reveal>
            </div>
        </div>
    );
}

function ServicesSection() {
    return (
        <div>
            <Separator/>
            <div className={`${styles.services} container`}>
                {SERVICES.map((title) => (
                    <div key={title}>
                        <Link to='/services' className={styles.service}>
                            <div className={styles.serviceTitle}>
                                <AnimatedHeading text={title} as='h3' inView/>
                            </div>
                            <img src={ArrowButton} className={styles.serviceArrow} alt=''/>
                        </Link>
                        <Separator wide/>
                    </div>
                ))}
            </div>
        </div>
    );
}

const ZOOM_IN = {hidden: {opacity: 0, scale: 0.96}, visible: {opacity: 1, scale: 1}};

function ProjectSection() {
    const project = HIGHLIGHT_PROJECT;
    return (
        <div className={`${styles.project} container`}>
            <div className={styles.projectHeading}>
                <AnimatedHeading text='BEHOLD OUR GREATEST PROJECT EVER' as='h2' inView/>
            </div>
            <Reveal variants={ZOOM_IN} transition={{duration: 0.7}}>
                <ParallaxBanner className={styles.projectImage}>
                    {/* testId: frozen in the visual tests (its offset depends on when the layout was measured) */}
                    <ParallaxBannerLayer image={project.image} speed={-12} testId='parallax-layer'/>
                </ParallaxBanner>
            </Reveal>
            <Reveal className={styles.projectCaption} variants={FADE} transition={{duration: 0.4, delay: 0.1}}>
                <div className={styles.projectName}>
                    <h4>{project.title}</h4>
                    <p className={`change-font ${styles.projectSubject}`}>{project.subject}</p>
                </div>
                <a href={project.url} target='_blank' rel='noopener noreferrer' className='change-font primary-link'>
                    Visit website
                </a>
            </Reveal>
        </div>
    );
}

const SLIDE_IN = {hidden: {opacity: 0, x: '100%'}, visible: {opacity: 1, x: '0'}};

function MarqueeRow({velocity, className = ''}) {
    return (
        <ParallaxText baseVelocity={velocity}>
            <div className={`${styles.marqueeRow} ${className}`}>
                <h2>UNIXSTUDIO</h2>
                <img className={styles.marqueeStar} src={StarDarkImg} alt='' draggable={false}/>
            </div>
        </ParallaxText>
    );
}

function CasesSection() {
    return (
        <div className={styles.cases}>
            <div className={styles.marquee}>
                <MarqueeRow velocity={3}/>
                <MarqueeRow velocity={-3} className={styles.marqueeSecond}/>
            </div>
            <div>
                <div className={`${styles.casesHeading} container`}>
                    <AnimatedHeading text='WITNESS THE BEAUTY' as='h2' inView/>
                    <div className={styles.casesSubheading}>
                        <AnimatedHeading text='SAFE AND BENEFICIAL DESIGN FOR HUMANITY' as='h4' inView/>
                    </div>
                </div>
                <Reveal
                    className={styles.carouselWrap}
                    variants={SLIDE_IN}
                    transition={{duration: 1, type: 'spring', ease: EASE_OUT}}
                >
                    <Carousel items={CAROUSEL_CASES}/>
                </Reveal>
            </div>
        </div>
    );
}

function CeoSection() {
    return (
        <div className={styles.ceo}>
            <div className={`${styles.ceoInner} container`}>
                <div className='flex-center'>
                    <AnimatedHeading text='ABOUT CEO' as='h2' inView/>
                </div>
                <div className={styles.ceoRow}>
                    <HeroStar replay className={styles.ceoStar}/>
                    <div>
                        <Testimonial review={CEO_REVIEW}/>
                    </div>
                </div>
                <div className={`${styles.ceoOutro} change-font container`}>
                    <Reveal as='p' className={styles.narrow}>
                        Dont’t wait any longer, let’s unleash your imagination and create something extraordinary
                        together
                    </Reveal>
                    <Reveal>
                        <Link to='/contact' className='primary-link'>Catch a glimse!</Link>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}

function StatsSection() {
    // "WORTHY" slides in from the left on wide screens, driven by the first stats cell
    const compact = useMediaQuery('(max-width: 991.98px)');
    const offset = compact ? 0 : -173;
    const firstCellRef = useRef(null);
    const firstCellInView = useInView(firstCellRef);

    return (
        <div className={`${styles.stats} container`}>
            <div>
                <div className={styles.statsHeading}>
                    <AnimatedHeadingLetters text='WE ARE' as='h1' inView/>
                    <m.div
                        className={styles.worthyRow}
                        initial={{translateX: offset}}
                        transition={{duration: 0.5, ease: 'backInOut'}}
                        animate={firstCellInView ? {translateX: 0} : {translateX: offset}}
                    >
                        <m.p
                            className={`change-font ${styles.bornIn}`}
                            transition={{duration: 0.7}}
                            initial={{opacity: 0}}
                            animate={firstCellInView ? {opacity: 1} : {opacity: 0}}
                        >
                            Born in UNIX
                        </m.p>
                        <AnimatedHeadingLetters text='WORTHY' as='h1' inView/>
                    </m.div>
                </div>
            </div>
            <div className={styles.statsGrid}>
                <StatContactCell/>
                <StatCell ref={firstCellRef} inView={firstCellInView} stat={HIGHLIGHT_STATS[0]} tall leftColumn/>
                <StatCell stat={HIGHLIGHT_STATS[1]} tall wide/>
                {STATS.map((stat, i) => (
                    <StatCell key={stat.title} stat={stat} leftColumn={i % 2 === 0}/>
                ))}
            </div>
            <div className={styles.clients}>
                <div className={styles.clientsHeading}>
                    <AnimatedHeading text='OUR CLIENTS' as='h1' inView/>
                </div>
                <Reveal as='p' className='change-font'>ALL AROUND THE GLOBE</Reveal>
            </div>
            <div className={styles.reviews}>
                <div className={styles.reviewsPlaceholder}/>
                <div className={styles.review}>
                    <div>
                        <Testimonial review={CLIENT_REVIEW} size='large'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function HomePage() {
    return (
        <div>
            <Hero
                title={<AnimatedHeadingLetters text='UNIXSTUDIO DIGITAL AGENCY' as='h1'/>}
                text='We won 50+ design awards in 2022 stand alone, some of which had us share the stage with Google, Netflix, and Spotify'
            />
            <AboutSection/>
            <ServicesSection/>
            <ProjectSection/>
            <CasesSection/>
            <CeoSection/>
            <StatsSection/>
            <Footer/>
        </div>
    );
}
