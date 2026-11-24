import {m} from 'motion/react';
import {Link} from 'react-router';
import CircularText from './CircularText';
import {useMediaQuery} from '../../hooks/useMediaQuery';

// Proportions measured from the original raster badge (300px canvas): the disc is 95% of the box,
// the four-point star 44%, the text band sits at ~0.73 of the radius.
const DISC = 0.953;
const RING = 0.79;
const FONT = 0.08;
const STAR = 0.46;

function Star({size}) {
    return (
        <svg width={size} height={size} viewBox='0 0 100 100' aria-hidden='true'>
            <path d='M50 0L64.3 35.7L100 50L64.3 64.3L50 100L35.7 64.3L0 50L35.7 35.7Z' fill='currentColor'/>
        </svg>
    );
}

/** Spinning "GET IN TOUCH" badge in the hero; links to the contact page. */
export function GetInTouchBadge() {
    const compact = useMediaQuery('(max-width: 992px)');
    const size = compact ? 120 : 160;

    return (
        <Link to='/contact' className='get-in-touch-badge' aria-label='Get in touch' style={{width: size, height: size}}>
            <m.div
                className='get-in-touch-badge__disc'
                style={{width: size * DISC, height: size * DISC}}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.7}}
                whileHover={{scale: 1.1}}
            >
                <CircularText
                    text='GET IN TOUCH - '
                    repeat={3}
                    fill={false}
                    stretch
                    spinDuration={12}
                    onHover='speedUp'
                    size={Math.round(size * RING)}
                    fontSize={Math.round(size * FONT)}
                    fontWeight={800}
                    className='get-in-touch-badge__text'
                >
                    <Star size={Math.round(size * STAR)}/>
                </CircularText>
            </m.div>
        </Link>
    );
}
