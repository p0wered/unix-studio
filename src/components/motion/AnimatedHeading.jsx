import {m} from 'motion/react';
import {EASE_OUT_HEADING} from './presets';
import styles from './AnimatedHeading.module.css';

// Words (or letters) slide up one after another. With `inView` they replay every time the heading
// enters the viewport; without it they play once on mount (hero headings).
//
// Accessibility: the animated words/letters are separate boxes, which a screen reader would read as
// "U N I X…". So the real text is a visually hidden element of the semantic tag (`tag`, e.g. h2), and
// the animated layer is aria-hidden spans that only borrow the look of `as` (h1–h4 or p).

const LOOK = {h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', p: 'text'};

const wordVariants = {
    hidden: {y: '100%', opacity: 0},
    visible: (i) => ({
        y: '0%',
        opacity: 1,
        transition: {duration: 0.7, delay: i * 0.1, ease: EASE_OUT_HEADING},
    }),
};

const letterVariants = {
    hidden: {y: '50%', opacity: 0},
    visible: (i) => ({
        y: '0%',
        opacity: 1,
        transition: {duration: 0.5, delay: i * 0.025, ease: EASE_OUT_HEADING},
    }),
};

function triggerProps(inView) {
    return inView
        ? {initial: 'hidden', whileInView: 'visible', viewport: {once: false}}
        : {initial: 'hidden', animate: 'visible'};
}

/**
 * Word by word.
 * as:  how it looks ('h1'–'h4', 'p')
 * tag: what it is for assistive tech (defaults to `as`)
 */
export function AnimatedHeading({text, as = 'h2', tag = as, inView = false}) {
    const Tag = tag;
    return (
        <m.div className={styles.row} {...triggerProps(inView)}>
            <Tag className='sr-only'>{text}</Tag>
            {text.split(' ').map((word, i) => (
                <span className={styles.wordBox} key={i} aria-hidden='true'>
                    <m.span variants={wordVariants} custom={i} className={`${styles.word} ${LOOK[as]}`}>
                        {word}
                    </m.span>
                </span>
            ))}
        </m.div>
    );
}

/** Letter by letter (big display headings). `className` goes on every letter. */
export function AnimatedHeadingLetters({text, as = 'h1', tag = as, inView = false, className}) {
    const Tag = tag;
    const letterClass = [styles.letter, LOOK[as], className].filter(Boolean).join(' ');
    let letterIndex = 0;
    return (
        <m.div className={styles.row} {...triggerProps(inView)}>
            <Tag className='sr-only'>{text}</Tag>
            {text.split(' ').map((word, w) => (
                <div key={w} className={styles.letterWord} aria-hidden='true'>
                    {[...word].map((letter, i) => (
                        <div key={i}>
                            <m.span variants={letterVariants} custom={letterIndex++} className={letterClass}>
                                {letter}
                            </m.span>
                        </div>
                    ))}
                </div>
            ))}
        </m.div>
    );
}
