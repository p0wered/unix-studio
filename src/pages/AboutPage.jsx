import {AnimatedHeading, AnimatedHeadingLetters} from '../components/motion/AnimatedHeading';
import {Reveal} from '../components/motion/Reveal';
import {EASE_OUT} from '../components/motion/presets';
import {Hero} from '../components/ui/Hero';
import {Carousel} from '../components/ui/Carousel';
import {CAROUSEL_CASES} from '../data/cases';
import AiImage from '../assets/ai.webp';
import AboutImg from '../assets/about-img.webp';
import styles from './AboutPage.module.css';

function AiSection() {
    return (
        <section className='container'>
            <div className={styles.aiGrid}>
                <div className={`${styles.aiItem} ${styles.first}`}>
                    <p className={styles.aiItemTitle}>MEET UNIX AI</p>
                    <p className='change-font'>
                        Check the health of your business processes with advanced AI-powered approaches. Compare your
                        current settings with the optimal ones. No free lunch theorem! Even though, we offer free
                        health-checks
                    </p>
                </div>
                <div className={`${styles.aiItem} ${styles.aiImageItem}`}>
                    <img
                        className={styles.aiImage}
                        src={AiImage}
                        alt=''
                        width={400}
                        height={307}
                        loading='lazy'
                        decoding='async'
                    />
                    <p className={styles.aiImageCaption}>BOOST YOUR BUSINESS</p>
                </div>
                <div className={styles.aiItem}>
                    <p className={styles.aiItemTitle}>OPTIMIZATION</p>
                    <p className='change-font'>
                        Learning to Solve Problems Without Human Knowledge. It has been a dream until the emergence of
                        Deep Learning and Reinforcement Learning.
                    </p>
                </div>
            </div>
            <div className={`${styles.aiOutro} flex-center`}>
                <p className='change-font'>
                    User-oriented design has proved to bring lucrative business benefits. From improving brand awareness
                    to increasing customer acquisition & retention to gaining market share – UX directly impacts
                    business
                </p>
            </div>
        </section>
    );
}

function ImageSection() {
    return (
        <section className={`${styles.imageSection} container`}>
            <div className='flex-center'>
                <img
                    className={styles.image}
                    src={AboutImg}
                    alt='The Unix Studio team discussing a project at a laptop'
                    width={1280}
                    height={700}
                    loading='lazy'
                    decoding='async'
                />
            </div>
        </section>
    );
}

function QuoteSection() {
    return (
        <section className={`${styles.quote} container`}>
            <div className={`${styles.quoteInner} flex-center`}>
                <AnimatedHeadingLetters text='TESTIMONIAL' as='h2' inView />
                <p className={`h3 change-font ${styles.quoteText}`}>
                    I have been hiring people in this space for a number of years
                </p>
                <p className={`h3 change-font ${styles.quoteText}`}>
                    And I have never seen this level of professionalism. It really feels like you are working with a
                    team that can get the job done
                </p>
            </div>
        </section>
    );
}

const SLIDE_IN = {hidden: {opacity: 0, x: '100%'}, visible: {opacity: 1, x: '0'}};

// WIP: team carousel for the about page, not on the page yet (placeholder people, case images).
const TEAM = CAROUSEL_CASES.map(({image}) => ({title: 'Eugene Massy', image}));

function TeamSection() {
    return (
        <Reveal className={styles.team} variants={SLIDE_IN} transition={{duration: 1, type: 'spring', ease: EASE_OUT}}>
            <Carousel items={TEAM} />
        </Reveal>
    );
}

export default function AboutPage() {
    return (
        <>
            <Hero
                wideTitle
                title={
                    <div>
                        <AnimatedHeadingLetters text='ABOUT US' as='h1' />
                        <AnimatedHeading text='WE LIVE BY THE CODE OF PASSION' as='p' />
                    </div>
                }
                text='We combine human empathy and intelligent data to provide the'
            />
            <AiSection />
            <ImageSection />
            <QuoteSection />
        </>
    );
}
