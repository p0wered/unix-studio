import {Link, useSearchParams} from 'react-router';
import {m} from 'motion/react';
import {AnimatedHeadingLetters} from '../components/motion/AnimatedHeading';
import {Reveal} from '../components/motion/Reveal';
import {EASE_OUT, FADE} from '../components/motion/presets';
import {Hero} from '../components/ui/Hero';
import {useHydrated} from '../hooks/useHydrated';
import {CASE_CATEGORIES, CASE_STUDIES, FEATURED_TEXT} from '../data/cases';
import styles from './CasesPage.module.css';

const circlesVariants = {
    hidden: {opacity: 1},
    visible: {
        opacity: 1,
        transition: {delayChildren: 0.1, staggerChildren: 0.06, ease: EASE_OUT},
    },
};

const circleVariants = {
    hidden: {x: '100%', opacity: 0},
    visible: (i) => ({
        x: `${i * 30}%`,
        opacity: 1,
        transition: {ease: EASE_OUT, duration: 0.4},
    }),
};

function AwardCircles() {
    return (
        <m.div className={styles.circles} variants={circlesVariants} initial='hidden' animate='visible'>
            {[0, 1, 2, 3].map((i) => (
                <m.div
                    key={i}
                    className={`${styles.circle} flex-center`}
                    variants={circleVariants}
                    custom={i}
                    style={{zIndex: 3 - i}}
                >
                    {i === 0 && (
                        <div className={styles.circleLabel}>
                            <p>WEBBY RED DOT</p>
                            <p className={styles.circleCount}>-X5</p>
                        </div>
                    )}
                </m.div>
            ))}
        </m.div>
    );
}

const FILTER_PARAM = 'category';

// Buttons: "all" + every category that has at least one case
const FILTERS = [
    {id: 'all', label: 'ALL', count: CASE_STUDIES.length},
    ...CASE_CATEGORIES.map((c) => ({...c, count: CASE_STUDIES.filter((s) => s.category === c.id).length})).filter(
        (c) => c.count > 0,
    ),
];

/** Selected filter lives in the URL (?category=design) so it survives reloads and can be shared. */
function useCaseFilter() {
    const [params] = useSearchParams();
    // the prerendered /cases page shows all cases; apply ?category= only after hydration
    const hydrated = useHydrated();
    const requested = hydrated ? params.get(FILTER_PARAM) : null;
    // unknown or empty categories fall back to "all"
    const active = FILTERS.some((f) => f.id === requested) ? requested : 'all';
    const cases = active === 'all' ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.category === active);
    return {active, cases, filters: FILTERS};
}

function CaseCard({study, rightBorder}) {
    return (
        <div className={rightBorder ? `${styles.card} ${styles.rightBorder}` : styles.card}>
            <Reveal className={styles.cardBody} variants={FADE} transition={{duration: 1, ease: EASE_OUT}}>
                <div className={styles.cardTitle}>
                    <p>{study.title}</p>
                    <p className={`change-font ${styles.cardYear}`}>/{study.year}</p>
                </div>
                <p className={`change-font ${styles.cardText}`}>{study.text}</p>
                <img className={styles.cardImage} src={study.image} alt={study.title} loading='lazy' decoding='async' />
            </Reveal>
        </div>
    );
}

function CasesSection() {
    const {active, cases, filters} = useCaseFilter();

    return (
        <section className={`${styles.section} container`}>
            <div className={styles.filters}>
                {filters.map((f) => (
                    <div key={f.id} className={f.id === active ? `${styles.filter} ${styles.active}` : styles.filter}>
                        <Link
                            to={f.id === 'all' ? '/cases' : `/cases?${FILTER_PARAM}=${f.id}`}
                            className={`${styles.filterLink} change-font`}
                            aria-current={f.id === active ? 'page' : undefined}
                        >
                            <p>
                                {f.label} [{f.count}]
                            </p>
                        </Link>
                    </div>
                ))}
            </div>
            <div className={styles.grid}>
                <div className={`${styles.card} ${styles.featured}`}>
                    <Reveal className={styles.cardBody} variants={FADE}>
                        <p>FEATURED</p>
                        <p className={`change-font ${styles.cardText}`}>{FEATURED_TEXT}</p>
                    </Reveal>
                </div>
                {cases.map((study, i) => (
                    // with the featured cell taking the first column, every other card sits in the middle column
                    <CaseCard key={study.id} study={study} rightBorder={i % 2 === 0} />
                ))}
            </div>
            <div className={`${styles.viewAll} flex-center`}>
                <Link className='primary-link' to='/cases'>
                    VIEW ALL CASES
                </Link>
            </div>
        </section>
    );
}

export default function CasesPage() {
    return (
        <div>
            <Hero
                background='dark'
                wideTitle
                title={
                    <div>
                        <AnimatedHeadingLetters text='OUR CASES' as='h1' />
                        <AnimatedHeadingLetters text='/SHOT' as='h1' tag='p' className={styles.outlined} />
                    </div>
                }
                aside={<AwardCircles />}
                text='Take a look behind the scenes, and discover the untold stories behind our projects, lessons learned, work culture, and business curiosities.'
                lightText
            />
            <CasesSection />
        </div>
    );
}
