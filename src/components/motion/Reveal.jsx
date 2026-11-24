import {m} from 'motion/react';
import {REVEAL_TRANSITION, REVEAL_UP} from './presets';

/**
 * Animates between the `hidden` and `visible` variants as the element enters and leaves the viewport
 * (every time, not once — that's how the whole site behaves).
 *
 * - By default the element watches itself.
 * - Pass `inView` to drive it from somewhere else (e.g. a neighbour's `useInView`).
 * - Children rendered with <RevealItem> inherit the state, so one observer can drive a whole group.
 */
export function Reveal({as = 'div', variants = REVEAL_UP, transition = REVEAL_TRANSITION, delay, inView, ...props}) {
    const Tag = m[as];
    const trigger = inView === undefined
        ? {whileInView: 'visible', viewport: {once: false}}
        : {animate: inView ? 'visible' : 'hidden'};
    return (
        <Tag
            initial='hidden'
            variants={variants}
            transition={delay ? {...transition, delay} : transition}
            {...trigger}
            {...props}
        />
    );
}

/** A child of <Reveal>: no observer of its own, follows the parent's hidden/visible state. */
export function RevealItem({as = 'div', variants = REVEAL_UP, transition = REVEAL_TRANSITION, delay, ...props}) {
    const Tag = m[as];
    return <Tag variants={variants} transition={delay ? {...transition, delay} : transition} {...props}/>;
}
