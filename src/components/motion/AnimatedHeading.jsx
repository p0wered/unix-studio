import {m} from 'motion/react';
import {EASE_OUT_HEADING} from './presets';

// Words (or letters) slide up one after another. With `inView` they replay every time the heading
// enters the viewport; without it they play once on mount (hero headings).

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

const rowStyle = {display: 'flex', flexWrap: 'wrap'};

/** Word by word. `as` is the tag of every word ('h2', 'h4', 'p', ...). */
export function AnimatedHeading({text, as = 'h2', inView = false}) {
    const Word = m[as];
    return (
        <m.div style={rowStyle} {...triggerProps(inView)}>
            {text.split(' ').map((word, i) => (
                <div className='animated-text-box' key={i}>
                    <Word variants={wordVariants} custom={i} style={{display: 'inline-block', marginRight: 14}}>
                        {word}
                    </Word>
                </div>
            ))}
        </m.div>
    );
}

/** Letter by letter (big display headings). */
export function AnimatedHeadingLetters({text, as = 'h1', inView = false, className}) {
    const Letter = m[as];
    let letterIndex = 0;
    return (
        <m.div style={rowStyle} {...triggerProps(inView)}>
            {text.split(' ').map((word, w) => (
                <div key={w} className='word-container' style={{display: 'flex', marginRight: '1.5em', overflow: 'hidden'}}>
                    {[...word].map((letter, i) => (
                        <div key={i} className='letter-container'>
                            <Letter
                                variants={letterVariants}
                                custom={letterIndex++}
                                style={{display: 'inline-block'}}
                                className={className}
                            >
                                {letter}
                            </Letter>
                        </div>
                    ))}
                </div>
            ))}
        </m.div>
    );
}
