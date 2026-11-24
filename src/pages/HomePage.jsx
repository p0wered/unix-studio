import {useRef} from 'react';
import {Link} from 'react-router';
import {m, useInView} from 'motion/react';
import {ParallaxBanner, ParallaxBannerLayer} from 'react-scroll-parallax';
import {AnimatedHeading, AnimatedHeadingLetters} from '../components/motion/AnimatedHeading';
import {ParallaxText} from '../components/motion/ParallaxText';
import {Reveal} from '../components/motion/Reveal';
import {Separator} from '../components/motion/Separator';
import {EASE_OUT, FADE} from '../components/motion/presets';
import {cssUrl} from '../components/ui/cssUrl';
import {Hero, HeroStar} from '../components/ui/Hero';
import {Carousel} from '../components/ui/Carousel';
import {Testimonial} from '../components/ui/Testimonial';
import {StatCell} from '../components/ui/StatCell';
import {Footer} from '../components/layout/Footer';
import {useMediaQuery} from '../hooks/useMediaQuery';
import {CAROUSEL_CASES, HIGHLIGHT_PROJECT} from '../data/cases';
import {CEO_REVIEW, CLIENT_REVIEW, HIGHLIGHT_STATS, SERVICES, STATS} from '../data/home';
import HeroGlow from '../assets/hero-glow.webp';
import HeroLines from '../assets/hero-lines.svg';
import GlowLower from '../assets/glow-lower.webp';
import StarDarkImg from '../assets/star-dark.svg';
import ArrowButton from '../assets/arrow_button.svg';
import Vector1 from '../assets/vector.svg';

function ToAboutSection() {
    return (
        <div>
            <Separator/>
            <img src={Vector1} id='vector1' draggable={false} alt=''/>
            <div className='to-about-section container'>
                <div className='flex-column' style={{maxWidth: '55rem', gap: '2rem'}}>
                    <AnimatedHeading text='LET’S FIND YOUR DESIGN PRODUCT' as='h2' inView/>
                    <AnimatedHeading text='SAFE AND BENEFICIAL DESIGN FOR HUMANITY' as='h4' inView/>
                </div>
                <Reveal className='merger change-font'>
                    <p style={{maxWidth: '55rem'}}>
                        We build engaging user experience for early-stage startups by connecting the dots between users’
                        needs and the client’s business model
                    </p>
                    <Link className='primary-link' to='/about' style={{fontWeight: 500}}>See details</Link>
                </Reveal>
            </div>
        </div>
    );
}

function ServicesSection() {
    return (
        <div>
            <Separator/>
            <div className='home-services container'>
                <div className='services-list'>
                    {SERVICES.map((title) => (
                        <div key={title}>
                            <Link to='/services' className='item'>
                                <div className='item-title' style={{maxWidth: '55rem'}}>
                                    <AnimatedHeading text={title} as='h3' inView/>
                                </div>
                                <img src={ArrowButton} alt=''/>
                            </Link>
                            <Separator wide/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const ZOOM_IN = {hidden: {opacity: 0, scale: 0.96}, visible: {opacity: 1, scale: 1}};

function HighlightProjectSection() {
    const project = HIGHLIGHT_PROJECT;
    return (
        <div className='home-cases container'>
            <div style={{maxWidth: 1280, marginBottom: '2vh'}}>
                <AnimatedHeading text='BEHOLD OUR GREATEST PROJECT EVER' as='h2' inView/>
            </div>
            <Reveal variants={ZOOM_IN} transition={{duration: 0.7}}>
                <ParallaxBanner className='image'>
                    <ParallaxBannerLayer image={project.image} speed={-12}/>
                </ParallaxBanner>
            </Reveal>
            <Reveal className='case-1' variants={FADE} transition={{duration: 0.4, delay: 0.1}}>
                <div className='flex-column' style={{gap: 5}}>
                    <h4>{project.title}</h4>
                    <p className='change-font' style={{color: '#484848'}}>{project.subject}</p>
                </div>
                <a href={project.url} target='_blank' rel='noopener noreferrer' className='change-font primary-link'>
                    Visit website
                </a>
            </Reveal>
        </div>
    );
}

const SLIDE_IN = {hidden: {opacity: 0, x: '100%'}, visible: {opacity: 1, x: '0'}};

function MarqueeRow({velocity, style}) {
    return (
        <ParallaxText baseVelocity={velocity}>
            <div className='flex-row' style={{alignItems: 'center', gap: '2rem', ...style}}>
                <h2>UNIXSTUDIO</h2>
                <img className='star-dark' src={StarDarkImg} alt='' draggable={false}/>
            </div>
        </ParallaxText>
    );
}

function CasesSection() {
    return (
        <div className='home-cases-slider' style={{backgroundImage: cssUrl(GlowLower)}}>
            <div style={{padding: 'calc(36px + 5vw) 0'}}>
                <MarqueeRow velocity={3}/>
                <MarqueeRow velocity={-3} style={{marginTop: 8}}/>
            </div>
            <div>
                <div className='container' style={{color: 'var(--content-light)'}}>
                    <AnimatedHeading text='WITNESS THE BEAUTY' as='h2' inView/>
                    <div style={{maxWidth: '55rem', marginTop: '2rem'}}>
                        <AnimatedHeading text='SAFE AND BENEFICIAL DESIGN FOR HUMANITY' as='h4' inView/>
                    </div>
                </div>
                <Reveal
                    className='slider-wrap'
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
        <div className='review-wrap flex-column'>
            <div className='review-section container'>
                <div className='flex-center'>
                    <AnimatedHeading text='ABOUT CEO' as='h2' inView/>
                </div>
                <div className='review-flexbox' style={{gap: '8vw', alignItems: 'center'}}>
                    <HeroStar replay/>
                    <div>
                        <Testimonial review={CEO_REVIEW} avatarStyle={{width: 72, height: 72, borderRadius: '50%'}}/>
                    </div>
                </div>
                <div className='review-footer change-font container'>
                    <Reveal as='p' style={{maxWidth: '55rem'}}>
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

const HIGHLIGHT_MIN_HEIGHT = 'calc(130px + 10vw)';

function StatsSection() {
    // "WORTHY" slides in from the left on wide screens, driven by the first stats cell
    const compact = useMediaQuery('(max-width: 991.98px)');
    const offset = compact ? 0 : -173;
    const firstCellRef = useRef(null);
    const firstCellInView = useInView(firstCellRef);

    return (
        <div className='stats-section container'>
            <div>
                <div style={{overflow: 'hidden'}}>
                    <AnimatedHeadingLetters text='WE ARE' as='h1' inView/>
                    <m.div
                        initial={{translateX: offset}}
                        transition={{duration: 0.5, ease: 'backInOut'}}
                        animate={firstCellInView ? {translateX: 0} : {translateX: offset}}
                        style={{display: 'flex', alignItems: 'flex-end', gap: '1rem'}}
                    >
                        <m.p
                            className='change-font stats-desc'
                            transition={{duration: 0.7}}
                            style={{marginBottom: 10, minWidth: 120}}
                            initial={{opacity: 0}}
                            animate={firstCellInView ? {opacity: 1} : {opacity: 0}}
                        >
                            Born in UNIX
                        </m.p>
                        <AnimatedHeadingLetters text='WORTHY' as='h1' inView/>
                    </m.div>
                </div>
            </div>
            <div className='stats-grid' style={{borderTop: '1px solid var(--border-dark)'}}>
                <div className='stats-item large-stats-item'>
                    <p></p>
                    <Link to='/contact' className='change-font primary-link'>Get in touch</Link>
                </div>
                <StatCell
                    ref={firstCellRef}
                    inView={firstCellInView}
                    stat={HIGHLIGHT_STATS[0]}
                    className='no-border'
                    minHeight={HIGHLIGHT_MIN_HEIGHT}
                />
                <StatCell stat={HIGHLIGHT_STATS[1]} className='two-cell' minHeight={HIGHLIGHT_MIN_HEIGHT}/>
                {STATS.map((stat, i) => (
                    <StatCell key={stat.title} stat={stat} className={i % 2 === 0 ? 'no-border' : ''}/>
                ))}
            </div>
            <div className='clients-flexbox'>
                <div style={{width: 'min-content'}}>
                    <AnimatedHeading text='OUR CLIENTS' as='h1' inView/>
                </div>
                <Reveal as='p' className='change-font'>ALL AROUND THE GLOBE</Reveal>
            </div>
            <div className='reviews-grid'>
                <div className='placeholder'/>
                <div className='review-flexbox stats-ed'>
                    <div>
                        <Testimonial
                            review={CLIENT_REVIEW}
                            avatarClassName='stats-review-img'
                            roleStyle={{fontSize: 16}}
                        />
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
                background={cssUrl(HeroLines, HeroGlow)}
                title={<AnimatedHeadingLetters text='UNIXSTUDIO DIGITAL AGENCY' as='h1'/>}
                text='We won 50+ design awards in 2022 stand alone, some of which had us share the stage with Google, Netflix, and Spotify'
            />
            <ToAboutSection/>
            <ServicesSection/>
            <HighlightProjectSection/>
            <CasesSection/>
            <CeoSection/>
            <StatsSection/>
            <Footer/>
        </div>
    );
}
