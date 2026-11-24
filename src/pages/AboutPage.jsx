import {AnimatedHeading, AnimatedHeadingLetters} from '../components/motion/AnimatedHeading';
import {Reveal} from '../components/motion/Reveal';
import {EASE_OUT} from '../components/motion/presets';
import {cssUrl} from '../components/ui/cssUrl';
import {Hero} from '../components/ui/Hero';
import {Carousel} from '../components/ui/Carousel';
import {Footer} from '../components/layout/Footer';
import {CAROUSEL_CASES} from '../data/cases';
import HeroGlow from '../assets/hero-glow.webp';
import HeroLines from '../assets/hero-lines.svg';
import GlowLower from '../assets/glow-lower.webp';
import AiImage from '../assets/ai.webp';
import AboutImg from '../assets/about-img.webp';

function AiSection() {
    return (
        <section className='container'>
            <div className='ai-grid'>
                <div className='ai-grid-item' id='ai-1'>
                    <p style={{fontWeight: 700, marginBottom: 6}}>MEET UNIX AI</p>
                    <p className='change-font'>
                        Check the health of your business processes with advanced AI-powered approaches. Compare your
                        current settings with the optimal ones. No free lunch theorem! Even though, we offer free
                        health-checks
                    </p>
                </div>
                <div className='ai-grid-item' id='image-ai'
                     style={{borderRight: '1px solid var(--border-light)', borderLeft: '1px solid var(--border-light)'}}>
                    <img src={AiImage} alt='' width={400} height={307} loading='lazy' decoding='async'
                         style={{width: '100%', height: 'auto'}}/>
                    <p style={{textAlign: 'center', fontSize: 18, marginTop: 12}}>BOOST YOUR BUSINESS</p>
                </div>
                <div className='ai-grid-item'>
                    <p style={{fontWeight: 700, marginBottom: 6}}>OPTIMIZATION</p>
                    <p className='change-font'>
                        Learning to Solve Problems Without Human Knowledge. It has been a dream until the emergence of
                        Deep Learning and Reinforcement Learning.
                    </p>
                </div>
            </div>
            <div className='flex-center' style={{padding: '5rem 0 0 0'}}>
                <p className='change-font' style={{textAlign: 'center', maxWidth: 840}}>
                    User-oriented design has proved to bring lucrative business benefits. From improving brand awareness
                    to increasing customer acquisition & retention to gaining market share – UX directly impacts business
                </p>
            </div>
        </section>
    );
}

function ImageSection() {
    return (
        <section className='container' style={{backgroundImage: cssUrl(GlowLower), backgroundColor: 'var(--content-dark)'}}>
            <div className='flex-center'>
                <img className='about-image' src={AboutImg} alt='' width={1280} height={700}
                     loading='lazy' decoding='async' style={{maxWidth: 1200}}/>
            </div>
        </section>
    );
}

function QuoteSection() {
    return (
        <section className='container' style={{backgroundColor: 'var(--content-dark)', color: 'var(--content-light)', paddingTop: 0}}>
            <div className='flex-center' style={{flexDirection: 'column', gap: '4vw'}}>
                <AnimatedHeadingLetters text='TESTIMONAL' as='h2' inView/>
                <h3 className='change-font' style={{maxWidth: 1200, textAlign: 'center'}}>
                    I have been hiring people in this space for a number of years
                </h3>
                <h3 className='change-font' style={{maxWidth: 1200, textAlign: 'center'}}>
                    And I have never seen this level of professionalism. It really feels like
                    you are working with a team that can get the job done
                </h3>
            </div>
        </section>
    );
}

const SLIDE_IN = {hidden: {opacity: 0, x: '100%'}, visible: {opacity: 1, x: '0'}};

// WIP: team carousel for the about page, not on the page yet (placeholder people, case images).
const TEAM = CAROUSEL_CASES.map(({image}) => ({title: 'Eugene Massy', image}));

function TeamSection() {
    return (
        <Reveal className='slider-wrap' variants={SLIDE_IN} transition={{duration: 1, type: 'spring', ease: EASE_OUT}}>
            <Carousel items={TEAM}/>
        </Reveal>
    );
}

export default function AboutPage() {
    return (
        <>
            <Hero
                background={cssUrl(HeroLines, HeroGlow)}
                innerStyle={{width: 'auto'}}
                title={
                    <div>
                        <AnimatedHeadingLetters text='ABOUT US' as='h1'/>
                        <AnimatedHeading text='WE LIVE BY THE CODE OF PASSION' as='p'/>
                    </div>
                }
                text='We combine human empathy and intelligent data to provide the'
            />
            <AiSection/>
            <ImageSection/>
            <QuoteSection/>
            <Footer/>
        </>
    );
}
