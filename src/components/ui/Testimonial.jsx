import {useRef} from 'react';
import {useInView} from 'motion/react';
import {Reveal} from '../motion/Reveal';
import {REVEAL_UP_SHORT} from '../motion/presets';
import QuoteMark from '../../assets/review.svg';

/**
 * Quote mark + quote + author. The quote mark follows the quote text into view;
 * the author row slides in a bit later on its own.
 */
export function Testimonial({review, avatarClassName, avatarStyle, roleStyle}) {
    const quoteRef = useRef(null);
    const quoteInView = useInView(quoteRef);

    return (
        <div className='review-flexbox' style={{maxWidth: '55rem'}}>
            <Reveal
                as='img'
                className='review-quote'
                src={QuoteMark}
                alt=''
                draggable={false}
                variants={REVEAL_UP_SHORT}
                inView={quoteInView}
            />
            <div className='flex-column' style={{gap: 'calc(32px + 1vw)'}}>
                <Reveal as='h4' ref={quoteRef} className='change-font' inView={quoteInView}>
                    {review.quote}
                </Reveal>
                <Reveal delay={0.3} className='flex-row' style={{gap: '2rem', alignItems: 'center'}}>
                    <img
                        src={review.avatar}
                        alt={review.name}
                        className={avatarClassName}
                        style={avatarStyle}
                        loading='lazy'
                        decoding='async'
                        draggable={false}
                    />
                    <div>
                        <p>{review.name}</p>
                        <p className='change-font' style={{color: '#808080', ...roleStyle}}>{review.role}</p>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
