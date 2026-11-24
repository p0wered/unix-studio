import {useRef} from 'react';
import {m, useInView} from 'motion/react';
import {REVEAL_TRANSITION} from '../motion/presets';
import {GetInTouchBadge} from './GetInTouchBadge';
import StarImg from '../../assets/star.svg';
import styles from './Hero.module.css';

const cx = (...classes) => classes.filter(Boolean).join(' ');

/**
 * Full-screen first section of every page: title (+ something on its right),
 * a short text and the "Get in touch" badge at the bottom.
 *
 * background: 'glow' (green glow + lines) or 'dark' (lines only)
 * wideTitle:  the title block takes its natural width instead of shrinking to the longest word
 * lightText:  light text colour for the dark background
 */
export function Hero({background = 'glow', title, aside, text, wideTitle = false, lightText = false}) {
    return (
        <section className={cx(styles.hero, styles[background], 'container')}>
            <div className={cx(styles.inner, wideTitle && styles.wide)}>
                {title}
                {aside ?? <HeroStar className={styles.starAside}/>}
            </div>
            <div className={styles.bottom}>
                <m.p
                    className={cx(styles.text, lightText && styles.light, 'change-font')}
                    transition={REVEAL_TRANSITION}
                    initial={{y: '200%', opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                >
                    {text}
                </m.p>
                <div>
                    <GetInTouchBadge/>
                </div>
            </div>
        </section>
    );
}

/**
 * Asterisk that pops in (scale + quarter turn) next to a title. With `replay` it shrinks away when
 * scrolled out and pops in again on return; otherwise it plays once on mount.
 */
export function HeroStar({replay = false, className}) {
    const ref = useRef(null);
    const inView = useInView(ref);
    const shown = {rotate: 90, scale: 1};
    return (
        <div className={cx(styles.star, className)}>
            <m.img
                ref={ref}
                src={StarImg}
                alt=''
                draggable={false}
                initial={{scale: 0}}
                animate={!replay || inView ? shown : {scale: 0}}
                transition={{duration: 1, type: 'spring'}}
            />
        </div>
    );
}
