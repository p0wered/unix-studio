// Shared motion values. Every reveal on the site uses one of these.

/** The site's signature easing: very fast start, long soft landing. */
export const EASE_OUT = [0.01, 0.95, 0.98, 1];
/** Slightly different curve used by the word/letter heading animations. */
export const EASE_OUT_HEADING = [0.01, 0.97, 0.99, 1];

export const REVEAL_TRANSITION = {duration: 0.7, ease: EASE_OUT};

/** Slide up from below its own box and fade in. */
export const REVEAL_UP = {
    hidden: {y: '100%', opacity: 0},
    visible: {y: 0, opacity: 1},
};

/** Same, but from a shorter distance (quote marks). */
export const REVEAL_UP_SHORT = {
    hidden: {y: '80%', opacity: 0},
    visible: {y: 0, opacity: 1},
};

export const FADE = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
};

/** For a parent that only passes the hidden/visible state down to its children. */
export const GROUP = {hidden: {}, visible: {}};
