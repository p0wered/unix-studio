import {useRef} from 'react';
import {m, useInView} from 'motion/react';
import {REVEAL_TRANSITION} from '../motion/presets';
import {GetInTouchBadge} from './GetInTouchBadge';
import StarImg from '../../assets/star.svg';

/**
 * Full-screen first section of every page: title (+ something on its right),
 * a short text and the "Get in touch" badge at the bottom.
 *
 * background: CSS background-image value (layers allowed)
 */
export function Hero({background, title, aside = <HeroStar/>, text, textStyle, innerStyle}) {
    return (
        <section className='title-section container' style={{backgroundImage: background}}>
            <div className='inner' style={innerStyle}>
                {title}
                {aside}
            </div>
            <div className='get-in-touch'>
                <m.p
                    className='lower-text change-font'
                    style={textStyle}
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
export function HeroStar({replay = false}) {
    const ref = useRef(null);
    const inView = useInView(ref);
    const shown = {rotate: 90, scale: 1};
    return (
        <div className='star-position'>
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
